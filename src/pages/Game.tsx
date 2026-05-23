
import React, { useEffect, useState } from 'react';
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

  const [showActions, setShowActions] = useState(false);

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

  const handleBuyCard = (card, fromReserve = false) => {
    if (!isAI) {
      buyCard(card, fromReserve);
      setShowActions(false);
    }
  };

  const handleReserveCard = (card) => {
    if (!isAI) {
      reserveCard(card);
      setShowActions(false);
    }
  };

  const handleTakeGems = () => {
    if (!isAI && gameState.selectedGems.length > 0) {
      takeGems();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-yellow-400">💎 璀璨宝石</h1>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
          >
            返回
          </button>
        </div>

        {gameState.players[1] && (
          <div className="mb-6">
            <PlayerArea 
              player={gameState.players[1]} 
              isCurrent={gameState.currentPlayer === 1}
            />
          </div>
        )}

        <div className="bg-white/10 backdrop-blur rounded-xl p-4 mb-4">
          <div className="flex justify-center gap-4 mb-6 flex-wrap">
            {gameState.board.nobles.map(noble => (
              <Noble key={noble.id} noble={noble} />
            ))}
          </div>

          <div className="flex justify-center gap-4 mb-6 flex-wrap">
            {gemTypes.map(gem => (
              <Gem
                key={gem}
                type={gem}
                count={gameState.gems[gem]}
                onClick={!isAI && gem !== 'gold' ? () => selectGem(gem) : undefined}
                selected={gameState.selectedGems.includes(gem)}
                size="large"
              />
            ))}
          </div>

          <div className="space-y-4">
            {[3, 2, 1].map(level => (
              <div key={level} className="flex justify-center gap-2 flex-wrap">
                {gameState.board[`level${level}`].map(card => (
                  <Card
                    key={card.id}
                    card={card}
                    onClick={() => !isAI && selectCard(card)}
                    selected={gameState.selectedCard?.id === card.id}
                    canAfford={canAffordCard(currentPlayer, card)}
                  />
                ))}
                <div className="w-24 h-32 bg-gray-700/30 rounded-xl flex items-center justify-center">
                  <span className="text-gray-400 text-xs">
                    {gameState.deck[`level${level}`].length} 张
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <PlayerArea 
          player={gameState.players[0]} 
          isCurrent={gameState.currentPlayer === 0}
        />

        {!isAI && (
          <div className="mt-6">
            {gameState.selectedGems.length > 0 && (
              <div className="mb-4 bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {gameState.selectedGems.map((gem, idx) => (
                      <Gem 
                        key={idx} 
                        type={gem} 
                        onClick={() => deselectGem(gem)}
                        selected
                      />
                    ))}
                  </div>
                  <button
                    onClick={handleTakeGems}
                    className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-400 transition-colors"
                  >
                    拿取宝石
                  </button>
                </div>
              </div>
            )}

            {gameState.selectedCard && (
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <Card card={gameState.selectedCard} selected />
                  <div className="flex gap-2">
                    {canAffordCard(currentPlayer, gameState.selectedCard) && (
                      <button
                        onClick={() => handleBuyCard(gameState.selectedCard)}
                        className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-400 transition-colors"
                      >
                        购买
                      </button>
                    )}
                    {currentPlayer.reservedCards.length < 3 && (
                      <button
                        onClick={() => handleReserveCard(gameState.selectedCard)}
                        className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 transition-colors"
                      >
                        保留
                      </button>
                    )}
                    <button
                      onClick={() => selectCard(null)}
                      className="px-4 py-2 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      取消
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentPlayer.reservedCards.length > 0 && !gameState.selectedCard && (
              <div className="mt-4 bg-white/10 backdrop-blur rounded-xl p-4">
                <h3 className="text-white font-bold mb-2">保留的卡牌</h3>
                <div className="flex gap-2 flex-wrap">
                  {currentPlayer.reservedCards.map(card => (
                    <Card
                      key={card.id}
                      card={card}
                      onClick={() => selectCard(card)}
                      canAfford={canAffordCard(currentPlayer, card)}
                    />
                  ))}
                </div>
              </div>
            )}

            {isAI && (
              <div className="text-center py-8">
                <p className="text-white text-xl animate-pulse">🤖 AI 正在思考...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
