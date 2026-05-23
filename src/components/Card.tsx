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
  1: {
    bg: 'bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100',
    border: 'border-emerald-300',
    text: 'text-emerald-800'
  },
  2: {
    bg: 'bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100',
    border: 'border-yellow-300',
    text: 'text-yellow-800'
  },
  3: {
    bg: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100',
    border: 'border-blue-300',
    text: 'text-blue-800'
  }
};

const levelLabel = {
  1: 'I',
  2: 'II', 
  3: 'III'
};

export const Card: React.FC<CardProps> = ({ 
  card, 
  onClick, 
  selected = false, 
  disabled = false,
  canAfford = true
}) => {
  const gemTypes = ['emerald', 'sapphire', 'ruby', 'diamond', 'onyx'] as const;
  const levelStyle = levelColors[card.level];

  return (
    <div
      className={`
        relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
        ${levelStyle.bg} ${levelStyle.border}
        ${selected ? 'ring-4 ring-yellow-400 scale-105 shadow-2xl' : ''}
        ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:scale-105 hover:shadow-xl'}
        ${!canAfford && !disabled ? 'grayscale-[40%] opacity-70' : ''}
        w-28 h-36
        shadow-lg card-shine
      `}
      onClick={disabled ? undefined : onClick}
    >
      <div className={`absolute top-2 right-2 w-8 h-8 rounded-full ${levelStyle.bg} ${levelStyle.border} border-2 flex items-center justify-center`}>
        <span className={`text-xs font-bold ${levelStyle.text}`}>
          {levelLabel[card.level]}
        </span>
      </div>
      
      {card.prestige > 0 && (
        <div className="absolute top-2 left-2 bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-lg prestige-text">
          {card.prestige}
        </div>
      )}
      
      <div className="absolute bottom-2 right-2">
        <Gem type={card.gemType} size="medium" />
      </div>
      
      <div className="mt-8 grid grid-cols-3 gap-1">
        {gemTypes.map((gem) => (
          card.cost[gem] > 0 && (
            <div key={gem} className="flex flex-col items-center">
              <Gem type={gem} size="small" />
              <span className={`text-xs font-bold ${levelStyle.text}`}>{card.cost[gem]}</span>
            </div>
          )
        ))}
      </div>
    </div>
  );
};
