// Vercel Serverless Function for Health Check
export default function handler(req, res) {
    // 设置 CORS 头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // 处理 OPTIONS 请求
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 健康检查
    res.status(200).json({
        success: true,
        message: 'DeepSeek API 服务器运行正常',
        timestamp: new Date().toISOString(),
        apiKeyLoaded: !!process.env.DEEPSEEK_API_KEY
    });
}
