import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store';
import { Gem } from '../components/Gem';
import { Card } from '../components/Card';
import { Noble } from '../components/Noble';
import { PlayerArea } from '../components/PlayerArea';
import { canAffordCard } from '../gameLogic';

export const Game: React.FC = () => {
  const navigate = useNavigate();
  const gameState = useGameStore(state => state.gameState);
  const selectGem = useGameStore(state => state.selectGem);
  const deselectGem = useGameStore(state => state.deselectGem);
  const takeGems = useGameStore(state => state.takeGems);
  const selectCard = useGameStore(state => state.selectCard);
  const reserveCard = useGameStore(state => state.reserveCard);
  const buyCard = useGameStore(state => state.buyCard);
  const aiTurn = useGameStore(state => state.aiTurn);

  useEffect(() => {
    if (!gameState) {
      navigate('/');
      return;
    }

    if (gameState.phase === 'ended') {
      navigate('/gameover');
      return;
    }

    if (gameState.players[gameState.currentPlayer].isAI) {
      aiTurn();
    }
  }, [gameState, navigate, aiTurn]);

  if (!gameState) return null;

  const currentPlayer = gameState.players[gameState.currentPlayer];
  const isAI = currentPlayer.isAI;
  const gemTypes = ['emerald', 'sapphire', 'ruby', 'diamond', 'onyx', 'gold'] as const;

  const handleBuyCard = (card: any, fromReserve = false) => {
    if (!isAI) {
      buyCard(card, fromReserve);
    }
  };

  const handleReserveCard = (card: any) => {
    if (!isAI) {
      reserveCard(card);
    }
  };

  const handleTakeGems = () => {
    if (!isAI && gameState.selectedGems.length > 0) {
      takeGems();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-950 to-indigo-950 opacity-90" />
      
      <div className="relative z-10 min-h-screen p-4 md:p-6 overflow-y-auto scrollbar-thin">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex justify-between items-center glass-effect rounded-xl px-6 py-4 shadow-luxury">
            <h1 className="text-2xl font-bold prestige-text">💎 璀璨宝石</h1>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              返回首页
            </button>
          </div>

          {gameState.players[1] && (
            <div className="animate-slide-up">
              <PlayerArea 
                player={gameState.players[1]} 
                isCurrent={gameState.currentPlayer === 1}
              />
            </div>
          )}

          <div className="glass-effect rounded-2xl p-6 shadow-luxury animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="mb-6">
              <h2 className="text-lg font-bold text-yellow-400 mb-3 flex items-center gap-2">
                <span>👑</span>
                <span>贵族</span>
              </h2>
              <div className="flex justify-center gap-4 flex-wrap">
                {gameState.board.nobles.map(noble => (
                  <div key={noble.id} className="transform hover:scale-110 transition-transform">
                    <Noble noble={noble} />
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-bold text-yellow-400 mb-3 flex items-center gap-2">
                <span>💎</span>
                <span>宝石</span>
              </h2>
              <div className="flex justify-center gap-4 flex-wrap">
                {gemTypes.map(gem => (
                  <div 
                    key={gem} 
                    className={`transform hover:scale-110 transition-all ${!isAI && gem !== 'gold' ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                    onClick={() => !isAI && gem !== 'gold' && selectGem(gem)}
                  >
                    <Gem
                      type={gem}
                      count={gameState.gems[gem]}
                      selected={gameState.selectedGems.includes(gem)}
                      size="large"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {[3, 2, 1].map(level => (
                <div key={level} className="card-shine">
                  <div className="mb-2 text-sm font-medium text-gray-400 flex items-center gap-2">
                    <span>等级 {level}</span>
                    <span className="text-xs">({gameState.deck[`level${level}`].length} 张牌)</span>
                  </div>
                  <div className="flex justify-center gap-3 flex-wrap">
                    {gameState.board[`level${level}`].map(card => (
                      <div 
                        key={card.id} 
                        className="transform hover:scale-110 transition-all"
                        onClick={() => !isAI && selectCard(card)}
                      >
                        <Card
                          card={card}
                          selected={gameState.selectedCard?.id === card.id}
                          canAfford={canAffordCard(currentPlayer, card)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <PlayerArea 
              player={gameState.players[0]} 
              isCurrent={gameState.currentPlayer === 0}
            />
          </div>

          {!isAI && (
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              {gameState.selectedGems.length > 0 && (
                <div className="glass-effect rounded-xl p-6 shadow-luxury">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex gap-3 flex-wrap">
                      {gameState.selectedGems.map((gem, idx) => (
                        <div 
                          key={idx} 
                          className="cursor-pointer transform hover:scale-110 transition-transform"
                          onClick={() => deselectGem(gem)}
                        >
                          <Gem type={gem} selected size="large" />
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={handleTakeGems}
                      className="luxury-button px-8 py-3 text-gray-900 font-bold rounded-lg"
                    >
                      拿取宝石 💎
                    </button>
                  </div>
                </div>
              )}

              {gameState.selectedCard && (
                <div className="glass-effect rounded-xl p-6 shadow-luxury">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="transform hover:scale-105 transition-transform">
                      <Card card={gameState.selectedCard} selected />
                    </div>
                    <div className="flex gap-3 flex-wrap">
                      {canAffordCard(currentPlayer, gameState.selectedCard) && (
                        <button
                          onClick={() => handleBuyCard(gameState.selectedCard)}
                          className="luxury-button px-6 py-3 text-gray-900 font-bold rounded-lg"
                        >
                          购买 🛒
                        </button>
                      )}
                      {currentPlayer.reservedCards.length < 3 && (
                        <button
                          onClick={() => handleReserveCard(gameState.selectedCard)}
                          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-lg hover:from-blue-400 hover:to-indigo-500 transition-all shadow-lg"
                        >
                          保留 📇
                        </button>
                      )}
                      <button
                        onClick={() => selectCard(null)}
                        className="px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-500 transition-all"
                      >
                        取消
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {currentPlayer.reservedCards.length > 0 && !gameState.selectedCard && (
                <div className="glass-effect rounded-xl p-6 shadow-luxury">
                  <h3 className="text-lg font-bold text-yellow-400 mb-3 flex items-center gap-2">
                    <span>📇</span>
                    <span>保留的卡牌</span>
                  </h3>
                  <div className="flex gap-3 flex-wrap">
                    {currentPlayer.reservedCards.map(card => (
                      <div 
                        key={card.id} 
                        className="transform hover:scale-110 transition-all cursor-pointer"
                        onClick={() => selectCard(card)}
                      >
                        <Card
                          card={card}
                          canAfford={canAffordCard(currentPlayer, card)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {isAI && (
            <div className="glass-effect rounded-xl p-8 shadow-luxury text-center">
              <div className="text-4xl mb-4 animate-pulse">🤖</div>
              <p className="text-xl text-gray-300 animate-pulse">AI 正在思考...</p>
            </div>
          )}

          {currentPlayer.reservedCards.length === 0 && !gameState.selectedCard && gameState.selectedGems.length === 0 && !isAI && (
            <div className="glass-effect rounded-xl p-6 shadow-luxury text-center">
              <p className="text-gray-400">👆 点击宝石或卡牌开始你的回合</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
