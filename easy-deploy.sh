#!/bin/bash

echo "💎 璀璨宝石游戏 - 超简单部署方案"
echo ""
echo "选择一个最简单的方式:"
echo ""
echo " 1️⃣  Netlify Drop (拖拽上传，30秒完成)"
echo " 2️⃣  Vercel (推荐，永久免费)"
echo " 3️⃣  Cloudflare Pages"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📁 构建产物已在 dist/ 文件夹中"
echo ""
echo "💡 最简单的方式: Netlify Drop"
echo ""
echo "步骤："
echo "1. 访问 https://app.netlify.com/drop"
echo "2. 把 dist 文件夹整个拖拽到页面上"
echo "3. 等待几秒，立即获得链接！"
echo ""
echo "✨ 或者使用 Vercel:"
echo "1. 访问 https://vercel.com/new"
echo "2. 导入你的 GitHub 仓库"
echo "3. 点击 Deploy，完成！"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🎮 部署成功后，把链接发给朋友一起玩吧！"
echo ""

# 先确保构建是最新的
echo "🔨 检查构建..."
if [ ! -d "dist" ]; then
    echo "📦 正在构建项目..."
    npm run build
fi

echo ""
echo "✅ 准备就绪！dist/ 文件夹已准备好部署！"
