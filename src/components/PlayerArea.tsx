import React from 'react';
import { Player } from '../types';
import { Gem } from './Gem';
import { Card } from './Card';
import { Noble } from './Noble';

interface PlayerAreaProps {
  player: Player;
  isCurrent: boolean;
}

export const PlayerArea: React.FC<PlayerAreaProps> = ({ player, isCurrent }) => {
  const gemTypes = ['emerald', 'sapphire', 'ruby', 'diamond', 'onyx', 'gold'] as const;

  return (
    <div className={`
      p-6 rounded-2xl transition-all duration-300
      ${isCurrent 
        ? 'glass-effect ring-2 ring-yellow-400 shadow-luxury' 
        : 'bg-white/5 backdrop-blur'
      }
    `}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className={`
            w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg
            ${isCurrent 
              ? 'bg-gradient-to-br from-yellow-400 to-amber-500 animate-pulse' 
              : 'bg-gray-600'
            }
          `}>
            {player.isAI ? '🤖' : '👤'}
          </div>
          <div>
            <h3 className="font-bold text-xl text-white">{player.name}</h3>
            {isCurrent && (
              <span className="text-xs text-yellow-400">当前回合</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-3xl animate-pulse">👑</span>
          <span className="font-bold text-4xl prestige-text">{player.prestige}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="text-xs text-gray-400 mb-2 font-medium">💎 宝石</div>
        <div className="flex gap-2 flex-wrap">
          {gemTypes.map((gem) => (
            <Gem key={gem} type={gem} count={player.gems[gem]} size="small" />
          ))}
        </div>
      </div>
      
      {player.bonuses.emerald + player.bonuses.sapphire + player.bonuses.ruby + player.bonuses.diamond + player.bonuses.onyx > 0 && (
        <div className="mb-4">
          <div className="text-xs text-gray-400 mb-2 font-medium">✨ 加成</div>
          <div className="flex gap-2 flex-wrap">
            {gemTypes.slice(0, 5).map((gem) => (
              player.bonuses[gem] > 0 && (
                <div key={gem} className="flex flex-col items-center">
                  <Gem type={gem} size="small" />
                  <span className="text-xs font-bold text-yellow-400">+{player.bonuses[gem]}</span>
                </div>
              )
            ))}
          </div>
        </div>
      )}
      
      {player.ownedCards.length > 0 && (
        <div className="mb-4">
          <div className="text-xs text-gray-400 mb-2 font-medium">🎴 拥有卡牌</div>
          <div className="flex gap-2 flex-wrap">
            {player.ownedCards.map((card) => (
              <Card key={card.id} card={card} disabled />
            ))}
          </div>
        </div>
      )}
      
      {player.nobles.length > 0 && (
        <div className="mb-4">
          <div className="text-xs text-gray-400 mb-2 font-medium">👑 贵族</div>
          <div className="flex gap-2 flex-wrap">
            {player.nobles.map((noble) => (
              <Noble key={noble.id} noble={noble} />
            ))}
          </div>
        </div>
      )}
      
      {player.reservedCards.length > 0 && (
        <div>
          <div className="text-xs text-gray-400 mb-2 font-medium">📇 保留卡牌</div>
          <div className="flex gap-2 flex-wrap">
            {player.reservedCards.map((card) => (
              <Card key={card.id} card={card} disabled />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
