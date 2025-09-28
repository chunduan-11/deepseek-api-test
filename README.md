# DeepSeek API 本地测试工具

这是一个用于本地测试 DeepSeek API 的完整项目，包含后端服务器和前端测试界面。

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置 API Key

1. 复制环境变量模板文件：
```bash
cp .env.example .env
```

2. 编辑 `.env` 文件，填入你的 DeepSeek API Key：
```
DEEPSEEK_API_KEY=your_actual_api_key_here
```

### 3. 获取 DeepSeek API Key

1. 访问 [DeepSeek 官网](https://platform.deepseek.com/)
2. 注册账号并登录
3. 进入 API Keys 页面
4. 创建新的 API Key
5. 将 API Key 复制到 `.env` 文件中

### 4. 启动服务器

```bash
# 生产模式
npm start

# 开发模式 (自动重启)
npm run dev
```

### 5. 访问测试界面

打开浏览器访问：http://localhost:3000

## 📁 项目结构

```
deepseek-api-test/
├── server.js          # 后端服务器
├── package.json       # 项目配置
├── .env.example       # 环境变量模板
├── .env              # 环境变量 (需要自己创建)
├── public/
│   └── index.html    # 前端测试界面
└── README.md         # 说明文档
```

## 🔧 API 端点

### POST /api/chat
发送消息给 DeepSeek AI

**请求体：**
```json
{
  "message": "你的问题",
  "model": "deepseek-chat"
}
```

**响应：**
```json
{
  "success": true,
  "response": "AI 的回复",
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 20,
    "total_tokens": 30
  },
  "model": "deepseek-chat"
}
```

### GET /api/models
获取可用的模型列表

### GET /api/health
健康检查端点

## 🎯 功能特性

- ✅ 支持 DeepSeek 多种模型
- ✅ 美观的现代化界面
- ✅ 实时状态监控
- ✅ Token 使用统计
- ✅ 示例问题快速填入
- ✅ 响应式设计，支持移动端
- ✅ 错误处理和用户友好提示
- ✅ 支持 Ctrl+Enter 快速发送

## 🔒 安全注意事项

1. **不要将 API Key 提交到版本控制系统**
2. `.env` 文件已在 `.gitignore` 中排除
3. 生产环境请使用 HTTPS
4. 定期轮换 API Key

## 🛠️ 自定义配置

### 修改端口
在 `.env` 文件中添加：
```
PORT=8080
```

### 添加新模型
在 `public/index.html` 的模型选择器中添加新选项：
```html
<option value="new-model">新模型名称</option>
```

## 📝 使用示例

### 通过 curl 测试 API

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "你好，请介绍一下自己",
    "model": "deepseek-chat"
  }'
```

## 🐛 故障排除

### 常见问题

1. **API Key 错误**
   - 检查 `.env` 文件中的 API Key 是否正确
   - 确认 API Key 有效且有足够余额

2. **端口被占用**
   - 修改 `.env` 文件中的 PORT 值
   - 或者停止占用端口的其他程序

3. **网络连接问题**
   - 检查网络连接
   - 确认防火墙设置

### 查看日志
服务器会在控制台输出详细的请求和错误日志，便于调试。

## 📚 相关链接

- [DeepSeek API 文档](https://api-docs.deepseek.com/zh-cn/)
- [DeepSeek 官网](https://platform.deepseek.com/)
- [Node.js 官网](https://nodejs.org/)

## 📄 许可证

MIT License