import React from 'react';
import { GemType } from '../types';

interface GemProps {
  type: GemType;
  count?: number;
  onClick?: () => void;
  selected?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const gemColors: Record<GemType, { bg: string; ring: string; text: string }> = {
  emerald: { bg: 'bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600', ring: 'ring-emerald-400', text: 'text-emerald-900' },
  sapphire: { bg: 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600', ring: 'ring-blue-400', text: 'text-blue-900' },
  ruby: { bg: 'bg-gradient-to-br from-red-400 via-red-500 to-red-600', ring: 'ring-red-400', text: 'text-red-900' },
  diamond: { bg: 'bg-gradient-to-br from-gray-100 via-white to-gray-200', ring: 'ring-gray-300', text: 'text-gray-800' },
  onyx: { bg: 'bg-gradient-to-br from-gray-800 via-gray-900 to-black', ring: 'ring-gray-600', text: 'text-white' },
  gold: { bg: 'bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500', ring: 'ring-yellow-400', text: 'text-yellow-900' }
};

const gemNames: Record<GemType, string> = {
  emerald: '祖母绿',
  sapphire: '蓝宝石',
  ruby: '红宝石',
  diamond: '钻石',
  onyx: '缟玛瑙',
  gold: '黄金'
};

export const Gem: React.FC<GemProps> = ({ 
  type, 
  count, 
  onClick, 
  selected = false,
  size = 'medium'
}) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-14 h-14',
    large: 'w-20 h-20'
  };

  const textSizes = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-xl'
  };

  return (
    <div
      className={`
        relative flex items-center justify-center
        ${sizeClasses[size]} rounded-full
        ${gemColors[type].bg}
        ${selected ? `ring-4 ring-yellow-400 scale-110 shadow-xl` : ''}
        ${onClick ? 'cursor-pointer hover:scale-105 hover:shadow-lg' : ''}
        shadow-md gem-precious
        transition-all duration-200
      `}
      onClick={onClick}
      title={gemNames[type]}
    >
      <div className="absolute inset-0 rounded-full bg-white opacity-20" 
           style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), transparent 50%)' }} />
      
      {count !== undefined && (
        <span className={`font-bold ${gemColors[type].text} ${textSizes[size]} relative z-10 drop-shadow-md`}>
          {count}
        </span>
      )}
    </div>
  );
};
