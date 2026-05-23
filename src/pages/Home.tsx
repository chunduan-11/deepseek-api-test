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
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-950 to-indigo-950">
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 80% 70%, rgba(139, 115, 85, 0.3) 0%, transparent 50%)`
          }}
        />
        <div className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center mb-16 animate-slide-up">
          <div className="mb-6 animate-float">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-yellow-600 via-yellow-400 to-amber-300 shadow-2xl gem-glow">
              <span className="text-7xl">💎</span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-4 prestige-text text-shadow-luxury tracking-wider">
            璀璨宝石
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light tracking-widest mb-2">
            SPLENDOR
          </p>
          <p className="text-sm text-gray-500 tracking-wider">
            Online Edition
          </p>
        </div>

        <div className="flex flex-col gap-6 mb-12 w-full max-w-md animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <button
            onClick={() => handleStartGame('ai')}
            className="luxury-button px-12 py-6 text-gray-900 font-bold text-xl rounded-xl shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 transition-all duration-700" />
            <span className="relative z-10 flex items-center justify-center gap-3">
              <span className="text-3xl">🤖</span>
              <span>人机对战</span>
            </span>
          </button>
          
          <button
            onClick={() => handleStartGame('local')}
            className="luxury-button px-12 py-6 text-gray-900 font-bold text-xl rounded-xl shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 transition-all duration-700" />
            <span className="relative z-10 flex items-center justify-center gap-3">
              <span className="text-3xl">👥</span>
              <span>双人对战</span>
            </span>
          </button>
        </div>

        <button
          onClick={() => setShowRules(!showRules)}
          className="text-gray-400 hover:text-yellow-400 transition-all duration-300 flex items-center gap-2 animate-slide-up"
          style={{ animationDelay: '0.4s' }}
        >
          <span className={`transform transition-transform duration-300 ${showRules ? 'rotate-180' : ''}`}>
            ▼
          </span>
          <span className="tracking-wider text-sm">{showRules ? '收起规则' : '查看规则'}</span>
        </button>

        {showRules && (
          <div className="mt-8 max-w-3xl glass-effect rounded-2xl p-8 shadow-luxury animate-slide-up">
            <h2 className="text-2xl font-bold mb-6 prestige-text text-center">游戏规则</h2>
            
            <div className="space-y-6 text-gray-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-2xl shadow-lg">
                  🎯
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">游戏目标</h3>
                  <p className="text-sm">第一个获得 <span className="prestige-text font-bold">15</span> 点威望分的玩家获胜！</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-2xl shadow-lg">
                  💎
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">拿取宝石</h3>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>拿取 <span className="text-yellow-400">3个不同颜色</span> 的宝石</li>
                    <li>或拿取 <span className="text-yellow-400">2个相同颜色</span> 的宝石（该颜色至少剩4个）</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl shadow-lg">
                  📇
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">保留卡牌</h3>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>从桌上保留一张卡牌到手中</li>
                    <li>同时获得 <span className="text-yellow-400">1个黄金</span></li>
                    <li>最多保留 <span className="text-yellow-400">3张</span></li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-2xl shadow-lg">
                  🛒
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">购买卡牌</h3>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>从桌上或保留的卡牌中购买</li>
                    <li>卡牌提供 <span className="text-yellow-400">永久加成</span> 和 <span className="text-yellow-400">威望分</span></li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center text-2xl shadow-lg">
                  👑
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">贵族来访</h3>
                  <p className="text-sm">满足贵族的条件时自动获得，提供 <span className="prestige-text font-bold">3点</span> 威望分</p>
                </div>
              </div>

              <div className="pt-4 border-t border-yellow-600/20">
                <p className="text-xs text-center text-gray-500">
                  💡 提示：手中宝石总数不能超过 10 个
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 flex items-center justify-center gap-8 text-gray-600 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎨</span>
            <span className="text-xs">精美设计</span>
          </div>
          <div className="w-px h-4 bg-gray-700" />
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="text-xs">流畅体验</span>
          </div>
          <div className="w-px h-4 bg-gray-700" />
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            <span className="text-xs">精彩对战</span>
          </div>
        </div>
      </div>
    </div>
  );
};
