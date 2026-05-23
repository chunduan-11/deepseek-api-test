import React from 'react';
import { Noble as NobleType } from '../types';
import { Gem } from './Gem';

interface NobleProps {
  noble: NobleType;
}

export const Noble: React.FC<NobleProps> = ({ noble }) => {
  const gemTypes = ['emerald', 'sapphire', 'ruby', 'diamond', 'onyx'] as const;

  return (
    <div className="relative p-4 bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 border-2 border-yellow-400 rounded-xl w-24 h-28 shadow-xl card-shine">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-yellow-200/20 to-amber-200/20" />
      
      <div className="absolute top-1 right-1 w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 text-white text-xs font-bold flex items-center justify-center shadow-lg prestige-text">
        {noble.prestige}
      </div>
      
      <div className="absolute top-1 left-1 text-2xl animate-sparkle">👑</div>
      
      <div className="mt-6 flex flex-wrap gap-1 justify-center">
        {gemTypes.map((gem) => (
          noble.requirements[gem] > 0 && (
            <div key={gem} className="flex flex-col items-center">
              <Gem type={gem} size="small" />
              <span className="text-xs font-bold text-gray-700">{noble.requirements[gem]}</span>
            </div>
          )
        ))}
      </div>
    </div>
  );
};
