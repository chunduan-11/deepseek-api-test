import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store';
import { PlayerArea } from '../components/PlayerArea';

export const GameOver: React.FC = () => {
  const navigate = useNavigate();
  const gameState = useGameStore(state => state.gameState);
  const startGame = useGameStore(state => state.startGame);

  if (!gameState) {
    navigate('/');
    return null;
  }

  const winner = gameState.winner !== null ? gameState.players[gameState.winner] : null;
  const mode = gameState.mode;

  const handlePlayAgain = () => {
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
        <div className="text-center mb-12 animate-slide-up">
          <div className="mb-6 animate-float">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-yellow-600 via-yellow-400 to-amber-300 shadow-2xl gem-glow">
              <span className="text-7xl">🏆</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 prestige-text text-shadow-luxury tracking-wider">
            游戏结束
          </h1>
          
          {winner && (
            <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="inline-block glass-effect rounded-2xl px-12 py-6 shadow-luxury">
                <p className="text-2xl md:text-3xl text-white mb-2">
                  🎉 <span className="prestige-text font-bold">{winner.name}</span> 获胜！🎉
                </p>
                <p className="text-lg text-gray-300">
                  最终得分：<span className="prestige-text font-bold text-3xl">{winner.prestige}</span> 点
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="w-full max-w-5xl space-y-6 mb-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          {gameState.players.map((player, idx) => (
            <div 
              key={player.id} 
              className="transform hover:scale-[1.02] transition-transform"
              style={{ animationDelay: `${0.5 + idx * 0.1}s` }}
            >
              {winner && player.id === winner.id && (
                <div className="mb-2 text-center">
                  <span className="inline-block px-4 py-1 bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-900 text-sm font-bold rounded-full shadow-lg">
                    👑 冠军 👑
                  </span>
                </div>
              )}
              <PlayerArea
                player={player}
                isCurrent={false}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-6 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <button
            onClick={handlePlayAgain}
            className="luxury-button px-12 py-6 text-gray-900 font-bold text-xl rounded-xl shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 transition-all duration-700" />
            <span className="relative z-10 flex items-center justify-center gap-3">
              <span className="text-3xl">🎮</span>
              <span>再玩一局</span>
            </span>
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="luxury-button px-12 py-6 text-gray-900 font-bold text-xl rounded-xl shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 transition-all duration-700" />
            <span className="relative z-10 flex items-center justify-center gap-3">
              <span className="text-3xl">🏠</span>
              <span>返回首页</span>
            </span>
          </button>
        </div>

        <div className="mt-12 text-center text-gray-500 animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <p className="text-sm">
            感谢游玩璀璨宝石 💎
          </p>
        </div>
      </div>
    </div>
  );
};
