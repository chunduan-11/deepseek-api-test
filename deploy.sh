#!/bin/bash

# 璀璨宝石游戏部署脚本

echo "💎 璀璨宝石游戏部署助手"
echo ""

# 检查是否有 git
if ! command -v git &> /dev/null; then
    echo "❌ 请先安装 git"
    exit 1
fi

# 初始化 git 仓库
if [ ! -d ".git" ]; then
    echo "📦 初始化 git 仓库..."
    git init
    git add .
    git commit -m "Initial commit - Splendor Online Game"
    echo ""
    echo "✅ Git 仓库已初始化"
    echo ""
    echo "📝 接下来的步骤："
    echo "1. 在 GitHub 上创建一个新仓库"
    echo "2. 运行 git remote add origin <你的仓库地址>"
    echo "3. 运行 git push -u origin main"
    echo "4. 访问 https://vercel.com 导入项目并部署"
else
    echo "✅ Git 仓库已存在"
    echo ""
    echo "📝 接下来的步骤："
    echo "1. 确保代码已推送到 GitHub"
    echo "2. 访问 https://vercel.com 导入项目并部署"
fi

echo ""
echo "🎮 部署成功后，把链接发给朋友一起玩吧！"
