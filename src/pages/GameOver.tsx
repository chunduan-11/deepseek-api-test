
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-yellow-400 mb-4 drop-shadow-lg">
          🎉 游戏结束 🎉
        </h1>
        {winner && (
          <div className="mb-6">
            <h2 className="text-3xl text-white mb-2">
              {winner.name} 获胜！
            </h2>
            <p className="text-purple-200 text-xl">
              最终得分：{winner.prestige} 点
            </p>
          </div>
        )}
      </div>

      <div className="w-full max-w-4xl space-y-4 mb-8">
        {gameState.players.map(player => (
          <PlayerArea
            key={player.id}
            player={player}
            isCurrent={false}
          />
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={handlePlayAgain}
          className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-purple-900 font-bold text-xl rounded-xl shadow-lg hover:from-yellow-300 hover:to-yellow-400 transform hover:scale-105 transition-all"
        >
          再玩一局
        </button>
        <button
          onClick={() => navigate('/')}
          className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold text-xl rounded-xl shadow-lg hover:from-purple-400 hover:to-purple-500 transform hover:scale-105 transition-all"
        >
          返回首页
        </button>
      </div>
    </div>
  );
};
