// Vercel Serverless Function for DeepSeek API
const https = require('https');

// 手动读取环境变量
const API_KEY = process.env.DEEPSEEK_API_KEY;

if (!API_KEY) {
    console.error('Missing DEEPSEEK_API_KEY environment variable');
}

// 调用 DeepSeek API (流式)
function callDeepSeekAPIStream(message, model = 'deepseek-chat', onChunk) {
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
            let thinkingContent = '';
            let finalContent = '';
            let usage = null;

            res.on('data', (chunk) => {
                buffer += chunk.toString();
                const lines = buffer.split('\n');
                buffer = lines.pop();

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
                                
                                if (delta.reasoning_content) {
                                    thinkingContent += delta.reasoning_content;
                                    onChunk({
                                        type: 'thinking',
                                        content: delta.reasoning_content,
                                        fullThinking: thinkingContent
                                    });
                                }
                                
                                if (delta.content) {
                                    finalContent += delta.content;
                                    onChunk({
                                        type: 'response',
                                        content: delta.content,
                                        fullResponse: finalContent
                                    });
                                }
                            }
                            
                            if (parsed.usage) {
                                usage = parsed.usage;
                            }
                        } catch (e) {
                            // 忽略解析错误
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

// Vercel Serverless Function Handler
export default async function handler(req, res) {
    // 设置 CORS 头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // 处理 OPTIONS 请求
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 只处理 POST 请求
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        const { message, model = 'deepseek-chat', stream = true } = req.body;
        
        if (!message) {
            res.status(400).json({ error: '消息内容不能为空' });
            return;
        }

        if (!API_KEY) {
            res.status(500).json({ error: 'API Key 未配置' });
            return;
        }

        console.log('DeepSeek API 请求:', { message: message.substring(0, 50) + '...', model });
        
        if (stream) {
            // 流式响应
            res.writeHead(200, {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Access-Control-Allow-Origin': '*'
            });

            try {
                await callDeepSeekAPIStream(message, model, (chunk) => {
                    res.write(`data: ${JSON.stringify(chunk)}\n\n`);
                });
                
                res.write(`data: [DONE]\n\n`);
                res.end();
            } catch (error) {
                console.error('流式响应错误:', error);
                res.write(`data: ${JSON.stringify({
                    type: 'error',
                    error: error.message
                })}\n\n`);
                res.end();
            }
        } else {
            // 非流式响应 (备用)
            res.status(501).json({ error: '暂不支持非流式模式' });
        }
        
    } catch (error) {
        console.error('处理请求错误:', error);
        res.status(500).json({
            success: false,
            error: '服务器内部错误: ' + error.message
        });
    }
}
