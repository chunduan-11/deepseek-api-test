
import React from 'react';
import { Card as CardType } from '../types';
import { Gem } from './Gem';

interface CardProps {
  card: CardType;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  canAfford?: boolean;
}

const levelColors = {
  1: 'bg-gradient-to-br from-green-100 to-green-200 border-green-300',
  2: 'bg-gradient-to-br from-yellow-100 to-yellow-200 border-yellow-300',
  3: 'bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300'
};

export const Card: React.FC<CardProps> = ({ 
  card, 
  onClick, 
  selected = false, 
  disabled = false,
  canAfford = true
}) => {
  const gemTypes = ['emerald', 'sapphire', 'ruby', 'diamond', 'onyx'] as const;

  return (
    <div
      className={`
        relative p-3 rounded-xl border-2 cursor-pointer transition-all duration-200
        ${levelColors[card.level]}
        ${selected ? 'ring-4 ring-yellow-400 scale-105' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
        ${!canAfford && !disabled ? 'grayscale-[30%]' : ''}
        w-24 h-32
        shadow-lg
      `}
      onClick={disabled ? undefined : onClick}
    >
      {card.prestige > 0 && (
        <div className="absolute top-1 right-1 bg-yellow-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
          {card.prestige}
        </div>
      )}
      
      <div className="absolute bottom-1 right-1">
        <Gem type={card.gemType} size="small" />
      </div>
      
      <div className="mt-6 grid grid-cols-3 gap-1">
        {gemTypes.map((gem) => (
          card.cost[gem] > 0 && (
            <div key={gem} className="flex flex-col items-center">
              <Gem type={gem} size="small" />
              <span className="text-xs font-bold text-gray-700">{card.cost[gem]}</span>
            </div>
          )
        ))}
      </div>
    </div>
  );
};
