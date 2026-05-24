# 💎 璀璨宝石 - 部署指南

## 游戏介绍

璀璨宝石（Splendor）在线版，支持人机对战和本地双人对战。

## 🚀 快速部署

### 方式一：Vercel（推荐，最简单）

1. **上传代码到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <你的仓库地址>
   git push -u origin main
   ```

2. **部署到 Vercel**
   - 访问 https://vercel.com
   - 用 GitHub 账号登录
   - 点击 "New Project"
   - 选择你的仓库
   - 点击 "Deploy"
   - 完成！获得公开访问链接

### 方式二：Netlify

1. 访问 https://netlify.com
2. 注册/登录
3. 选择 "Add new site" → "Deploy manually"
4. 拖拽 `dist` 文件夹到部署区域
5. 立即获得访问链接

### 方式三：GitHub Pages

1. 构建项目：`npm run build`
2. 将 `dist` 文件夹内容上传到 GitHub Pages 或其他静态托管

## 🎮 游戏功能

- ✅ 人机对战模式
- ✅ 本地双人对战模式
- ✅ 完整的游戏规则实现
- ✅ 精美的 UI 设计
- ✅ 响应式设计，支持移动端
- ✅ 流畅的动画效果

## 📱 分享给朋友

部署成功后，直接把链接发给朋友即可！两人可以选择本地双人模式一起玩。

## 🛠️ 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 💡 技术栈

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Zustand (状态管理)
- React Router

祝玩得开心！💎✨
