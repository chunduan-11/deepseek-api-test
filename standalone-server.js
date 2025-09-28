// 完全独立的服务器，不依赖任何外部模块
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;

// 手动读取 .env 文件
function loadEnv() {
    try {
        const envContent = fs.readFileSync('.env', 'utf8');
        const lines = envContent.split('\n');
        const env = {};
        
        lines.forEach(line => {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#')) {
                const [key, ...valueParts] = trimmed.split('=');
                if (key && valueParts.length > 0) {
                    env[key.trim()] = valueParts.join('=').trim();
                }
            }
        });
        
        return env;
    } catch (error) {
        console.error('无法读取 .env 文件:', error.message);
        return {};
    }
}

const env = loadEnv();
const API_KEY = env.DEEPSEEK_API_KEY;

if (!API_KEY) {
    console.error('错误: 请在 .env 文件中设置 DEEPSEEK_API_KEY');
    console.error('当前 .env 内容:', env);
    process.exit(1);
}

console.log('✅ API Key 已加载:', API_KEY.substring(0, 10) + '...');

// MIME 类型映射
const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml'
};

// 调用 DeepSeek API (流式)
function callDeepSeekAPIStream(message, model = 'deepseek-chat', onChunk) {
    const https = require('https');
    
    const postData = JSON.stringify({
        model: model,
        messages: [
            {
                role: 'user',
                content: message
            }
        ],
        max_tokens: 2000,
        temperature: 0.7,
        stream: true
    });

    const options = {
        hostname: 'api.deepseek.com',
        port: 443,
        path: '/v1/chat/completions',
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let buffer = '';
            let isThinking = false;
            let thinkingContent = '';
            let finalContent = '';
            let usage = null;

            res.on('data', (chunk) => {
                buffer += chunk.toString();
                const lines = buffer.split('\n');
                buffer = lines.pop(); // 保留不完整的行

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        if (data === '[DONE]') {
                            resolve({
                                success: true,
                                response: finalContent,
                                reasoning_content: thinkingContent,
                                usage: usage,
                                model: model
                            });
                            return;
                        }

                        try {
                            const parsed = JSON.parse(data);
                            if (parsed.choices && parsed.choices[0]) {
                                const delta = parsed.choices[0].delta;
                                
                                // 处理推理内容
                                if (delta.reasoning_content) {
                                    thinkingContent += delta.reasoning_content;
                                    onChunk({
                                        type: 'thinking',
                                        content: delta.reasoning_content,
                                        fullThinking: thinkingContent
                                    });
                                }
                                
                                // 处理最终回答
                                if (delta.content) {
                                    finalContent += delta.content;
                                    onChunk({
                                        type: 'response',
                                        content: delta.content,
                                        fullResponse: finalContent
                                    });
                                }
                            }
                            
                            // 处理使用统计
                            if (parsed.usage) {
                                usage = parsed.usage;
                            }
                        } catch (e) {
                            // 忽略解析错误，继续处理下一行
                        }
                    }
                }
            });

            res.on('end', () => {
                resolve({
                    success: true,
                    response: finalContent,
                    reasoning_content: thinkingContent,
                    usage: usage,
                    model: model
                });
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.write(postData);
        req.end();
    });
}

// 非流式调用 (备用)
async function callDeepSeekAPI(message, model = 'deepseek-chat') {
    const https = require('https');
    
    const postData = JSON.stringify({
        model: model,
        messages: [
            {
                role: 'user',
                content: message
            }
        ],
        max_tokens: 2000,
        temperature: 0.7
    });

    const options = {
        hostname: 'api.deepseek.com',
        port: 443,
        path: '/v1/chat/completions',
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const response = JSON.parse(data);
                    if (res.statusCode === 200) {
                        const choice = response.choices[0];
                        const result = {
                            success: true,
                            response: choice.message.content,
                            usage: response.usage,
                            model: model
                        };
                        
                        // 如果是思考模型，提取推理过程
                        if (model.includes('reasoner') && choice.message.reasoning_content) {
                            result.reasoning_content = choice.message.reasoning_content;
                        }
                        
                        resolve(result);
                    } else {
                        resolve({
                            success: false,
                            error: response.error?.message || '调用 DeepSeek API 时发生错误',
                            details: response
                        });
                    }
                } catch (error) {
                    reject(error);
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.write(postData);
        req.end();
    });
}

// 创建服务器
const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // 设置 CORS 头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // 处理 OPTIONS 请求
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // API 路由 - 流式聊天
    if (pathname === '/api/chat' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const { message, model, stream = true } = JSON.parse(body);
                
                if (!message) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: '消息内容不能为空' }));
                    return;
                }

                console.log('🚀 发送请求到 DeepSeek API:', { message: message.substring(0, 50) + '...', model, stream });
                
                if (stream) {
                    // 流式响应
                    res.writeHead(200, {
                        'Content-Type': 'text/event-stream',
                        'Cache-Control': 'no-cache',
                        'Connection': 'keep-alive',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Cache-Control'
                    });

                    try {
                        await callDeepSeekAPIStream(message, model, (chunk) => {
                            res.write(`data: ${JSON.stringify(chunk)}\n\n`);
                        });
                        
                        res.write(`data: [DONE]\n\n`);
                        res.end();
                        console.log('✅ DeepSeek API 流式响应完成');
                    } catch (error) {
                        console.error('❌ 流式响应错误:', error);
                        res.write(`data: ${JSON.stringify({
                            type: 'error',
                            error: error.message
                        })}\n\n`);
                        res.end();
                    }
                } else {
                    // 非流式响应 (备用)
                    const result = await callDeepSeekAPI(message, model);
                    
                    if (result.success) {
                        console.log('✅ DeepSeek API 响应成功');
                    } else {
                        console.log('❌ DeepSeek API 响应失败:', result.error);
                    }
                    
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(result));
                }
                
            } catch (error) {
                console.error('❌ 处理请求错误:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: false,
                    error: '服务器内部错误: ' + error.message
                }));
            }
        });
        return;
    }

    // API 路由 - 健康检查
    if (pathname === '/api/health' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            success: true,
            message: 'DeepSeek API 服务器运行正常',
            timestamp: new Date().toISOString(),
            apiKeyLoaded: !!API_KEY
        }));
        return;
    }

    // 静态文件服务
    let filePath;
    if (pathname === '/') {
        filePath = path.join(__dirname, 'public', 'index.html');
    } else {
        // 移除开头的斜杠，并确保在 public 目录下
        const cleanPath = pathname.startsWith('/') ? pathname.substring(1) : pathname;
        filePath = path.join(__dirname, 'public', cleanPath);
    }

    // 检查文件是否存在
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // 文件不存在，返回 404
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`
                <!DOCTYPE html>
                <html>
                <head><title>404 Not Found</title></head>
                <body>
                    <h1>404 - 页面未找到</h1>
                    <p>请求的文件不存在: ${pathname}</p>
                    <p><a href="/">返回首页</a></p>
                </body>
                </html>
            `);
            return;
        }

        // 获取文件扩展名
        const extname = String(path.extname(filePath)).toLowerCase();
        const mimeType = mimeTypes[extname] || 'application/octet-stream';

        // 读取并返回文件
        fs.readFile(filePath, (error, content) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('服务器错误: ' + error.code);
            } else {
                res.writeHead(200, { 'Content-Type': mimeType });
                res.end(content);
            }
        });
    });
});

server.listen(PORT, () => {
    console.log('\n🎉 DeepSeek API 测试服务器启动成功！');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`🌐 前端界面: http://localhost:${PORT}`);
    console.log(`🔗 API 端点: http://localhost:${PORT}/api/chat`);
    console.log(`💚 健康检查: http://localhost:${PORT}/api/health`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📝 使用说明:');
    console.log('   1. 在浏览器中打开 http://localhost:${PORT}');
    console.log('   2. 在输入框中输入问题');
    console.log('   3. 点击发送按钮测试 DeepSeek API');
    console.log('   4. 按 Ctrl+C 停止服务器');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});

// 优雅关闭
process.on('SIGINT', () => {
    console.log('\n🛑 正在关闭服务器...');
    server.close(() => {
        console.log('✅ 服务器已关闭');
        process.exit(0);
    });
});