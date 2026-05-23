
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const startGame = useGameStore(state => state.startGame);
  const [showRules, setShowRules] = useState(false);

  const handleStartGame = (mode: 'ai' | 'local') => {
    startGame(mode);
    navigate('/game');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-yellow-400 mb-4 drop-shadow-lg">
          💎 璀璨宝石 💎
        </h1>
        <p className="text-purple-200 text-lg">Splendor Online</p>
      </div>

      <div className="flex flex-col gap-4 mb-8">
        <button
          onClick={() => handleStartGame('ai')}
          className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-purple-900 font-bold text-xl rounded-xl shadow-lg hover:from-yellow-300 hover:to-yellow-400 transform hover:scale-105 transition-all"
        >
          🤖 人机对战
        </button>
        <button
          onClick={() => handleStartGame('local')}
          className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold text-xl rounded-xl shadow-lg hover:from-purple-400 hover:to-purple-500 transform hover:scale-105 transition-all"
        >
          👥 双人对战
        </button>
      </div>

      <button
        onClick={() => setShowRules(!showRules)}
        className="text-purple-200 hover:text-white transition-colors"
      >
        {showRules ? '隐藏规则 ▲' : '查看规则 ▼'}
      </button>

      {showRules && (
        <div className="mt-4 max-w-2xl bg-white/10 backdrop-blur rounded-xl p-6 text-white">
          <h2 className="text-xl font-bold mb-4 text-yellow-400">游戏规则</h2>
          <div className="space-y-3 text-sm">
            <p><strong>目标：</strong>第一个获得 15 点威望分的玩家获胜！</p>
            <p><strong>行动选择：</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>拿取 3 个不同颜色的宝石</li>
              <li>拿取 2 个相同颜色的宝石（该颜色至少剩 4 个）</li>
              <li>保留一张卡牌并获得 1 个黄金（最多保留 3 张）</li>
              <li>购买一张卡牌（从桌面上或自己保留的卡牌中）</li>
            </ul>
            <p><strong>卡牌：</strong>提供永久宝石加成和威望分</p>
            <p><strong>贵族：</strong>满足条件时自动获得，提供 3 点威望分</p>
            <p><strong>限制：</strong>手中宝石总数不能超过 10 个</p>
          </div>
        </div>
      )}
    </div>
  );
};
