
import React from 'react';
import { Noble as NobleType } from '../types';
import { Gem } from './Gem';

interface NobleProps {
  noble: NobleType;
}

export const Noble: React.FC<NobleProps> = ({ noble }) => {
  const gemTypes = ['emerald', 'sapphire', 'ruby', 'diamond', 'onyx'] as const;

  return (
    <div className="relative p-3 bg-gradient-to-br from-yellow-100 to-amber-200 border-2 border-yellow-400 rounded-xl w-20 h-24 shadow-lg">
      <div className="absolute top-1 right-1 bg-yellow-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
        {noble.prestige}
      </div>
      
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
