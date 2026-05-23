
import React from 'react';
import { GemType } from '../types';

interface GemProps {
  type: GemType;
  count?: number;
  onClick?: () => void;
  selected?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const gemColors: Record<GemType, string> = {
  emerald: 'bg-emerald-500',
  sapphire: 'bg-blue-500',
  ruby: 'bg-red-500',
  diamond: 'bg-white',
  onyx: 'bg-gray-900',
  gold: 'bg-yellow-400'
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
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-14 h-14'
  };

  return (
    <div
      className={`
        flex items-center justify-center cursor-pointer
        ${sizeClasses[size]} rounded-full
        ${gemColors[type]}
        ${selected ? 'ring-4 ring-yellow-300 scale-110' : ''}
        ${onClick ? 'hover:scale-105 transition-transform' : ''}
        shadow-md
      `}
      onClick={onClick}
      title={gemNames[type]}
    >
      {count !== undefined && (
        <span className={`
          font-bold ${type === 'diamond' ? 'text-gray-800' : 'text-white'}
          ${size === 'small' ? 'text-xs' : size === 'large' ? 'text-xl' : 'text-sm'}
        `}>
          {count}
        </span>
      )}
    </div>
  );
};
