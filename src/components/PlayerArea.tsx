
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
    <div className={`p-4 rounded-xl ${isCurrent ? 'bg-purple-100 border-2 border-purple-500' : 'bg-gray-50'}`}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg">{player.name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-2xl">👑</span>
          <span className="font-bold text-2xl text-purple-600">{player.prestige}</span>
        </div>
      </div>
      
      <div className="mb-3">
        <div className="flex gap-2 flex-wrap">
          {gemTypes.map((gem) => (
        <Gem key={gem} type={gem} count={player.gems[gem]} size="small" />
      ))}
        </div>
      </div>
      
      <div className="mb-3">
        <div className="text-xs text-gray-600 mb-1">加成</div>
        <div className="flex gap-2 flex-wrap">
          {gemTypes.slice(0, 5).map((gem) => (
            player.bonuses[gem] > 0 && (
              <div key={gem} className="flex flex-col items-center">
                <Gem type={gem} size="small" />
                <span className="text-xs font-bold">{player.bonuses[gem]}</span>
              </div>
            )
          ))}
        </div>
      </div>
      
      {player.ownedCards.length > 0 && (
        <div className="mb-3">
          <div className="text-xs text-gray-600 mb-1">卡牌</div>
          <div className="flex gap-1 flex-wrap">
            {player.ownedCards.map((card) => (
              <Card key={card.id} card={card} disabled />
            ))}
          </div>
        </div>
      )}
      
      {player.nobles.length > 0 && (
        <div className="mb-3">
          <div className="text-xs text-gray-600 mb-1">贵族</div>
          <div className="flex gap-2 flex-wrap">
            {player.nobles.map((noble) => (
              <Noble key={noble.id} noble={noble} />
            ))}
          </div>
        </div>
      )}
      
      {player.reservedCards.length > 0 && (
        <div>
          <div className="text-xs text-gray-600 mb-1">保留</div>
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
