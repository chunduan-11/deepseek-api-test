
import { Card, Noble, Gem } from './types';

export const createEmptyGem = (): Gem => ({
  emerald: 0,
  sapphire: 0,
  ruby: 0,
  diamond: 0,
  onyx: 0,
  gold: 0
});

export const level1Cards: Card[] = [
  { id: 1, level: 1, prestige: 0, gemType: 'emerald', cost: { ...createEmptyGem(), sapphire: 3 } },
  { id: 2, level: 1, prestige: 0, gemType: 'emerald', cost: { ...createEmptyGem(), sapphire: 2, onyx: 2 } },
  { id: 3, level: 1, prestige: 0, gemType: 'emerald', cost: { ...createEmptyGem(), ruby: 1, sapphire: 1, onyx: 1 } },
  { id: 4, level: 1, prestige: 0, gemType: 'emerald', cost: { ...createEmptyGem(), onyx: 4 } },
  { id: 5, level: 1, prestige: 1, gemType: 'emerald', cost: { ...createEmptyGem(), ruby: 2, sapphire: 2 } },
  { id: 6, level: 1, prestige: 0, gemType: 'sapphire', cost: { ...createEmptyGem(), emerald: 3 } },
  { id: 7, level: 1, prestige: 0, gemType: 'sapphire', cost: { ...createEmptyGem(), emerald: 2, ruby: 2 } },
  { id: 8, level: 1, prestige: 0, gemType: 'sapphire', cost: { ...createEmptyGem(), emerald: 1, diamond: 1, ruby: 1 } },
  { id: 9, level: 1, prestige: 0, gemType: 'sapphire', cost: { ...createEmptyGem(), ruby: 4 } },
  { id: 10, level: 1, prestige: 1, gemType: 'sapphire', cost: { ...createEmptyGem(), emerald: 2, diamond: 2 } },
  { id: 11, level: 1, prestige: 0, gemType: 'ruby', cost: { ...createEmptyGem(), diamond: 3 } },
  { id: 12, level: 1, prestige: 0, gemType: 'ruby', cost: { ...createEmptyGem(), diamond: 2, onyx: 2 } },
  { id: 13, level: 1, prestige: 0, gemType: 'ruby', cost: { ...createEmptyGem(), emerald: 1, sapphire: 1, diamond: 1 } },
  { id: 14, level: 1, prestige: 0, gemType: 'ruby', cost: { ...createEmptyGem(), emerald: 4 } },
  { id: 15, level: 1, prestige: 1, gemType: 'ruby', cost: { ...createEmptyGem(), sapphire: 2, onyx: 2 } },
  { id: 16, level: 1, prestige: 0, gemType: 'diamond', cost: { ...createEmptyGem(), ruby: 3 } },
  { id: 17, level: 1, prestige: 0, gemType: 'diamond', cost: { ...createEmptyGem(), emerald: 2, onyx: 2 } },
  { id: 18, level: 1, prestige: 0, gemType: 'diamond', cost: { ...createEmptyGem(), sapphire: 1, ruby: 1, onyx: 1 } },
  { id: 19, level: 1, prestige: 0, gemType: 'diamond', cost: { ...createEmptyGem(), sapphire: 4 } },
  { id: 20, level: 1, prestige: 1, gemType: 'diamond', cost: { ...createEmptyGem(), emerald: 2, onyx: 2 } },
  { id: 21, level: 1, prestige: 0, gemType: 'onyx', cost: { ...createEmptyGem(), diamond: 3 } },
  { id: 22, level: 1, prestige: 0, gemType: 'onyx', cost: { ...createEmptyGem(), emerald: 2, diamond: 2 } },
  { id: 23, level: 1, prestige: 0, gemType: 'onyx', cost: { ...createEmptyGem(), emerald: 1, diamond: 1, ruby: 1 } },
  { id: 24, level: 1, prestige: 0, gemType: 'onyx', cost: { ...createEmptyGem(), diamond: 4 } },
  { id: 25, level: 1, prestige: 1, gemType: 'onyx', cost: { ...createEmptyGem(), emerald: 2, sapphire: 2 } },
  { id: 26, level: 1, prestige: 1, gemType: 'emerald', cost: { ...createEmptyGem(), onyx: 3, ruby: 2 } },
  { id: 27, level: 1, prestige: 1, gemType: 'sapphire', cost: { ...createEmptyGem(), emerald: 3, diamond: 2 } },
  { id: 28, level: 1, prestige: 1, gemType: 'ruby', cost: { ...createEmptyGem(), sapphire: 3, onyx: 2 } },
  { id: 29, level: 1, prestige: 1, gemType: 'diamond', cost: { ...createEmptyGem(), onyx: 3, emerald: 2 } },
  { id: 30, level: 1, prestige: 1, gemType: 'onyx', cost: { ...createEmptyGem(), ruby: 3, sapphire: 2 } },
  { id: 31, level: 1, prestige: 2, gemType: 'emerald', cost: { ...createEmptyGem(), emerald: 3, sapphire: 2, ruby: 2 } },
  { id: 32, level: 1, prestige: 2, gemType: 'sapphire', cost: { ...createEmptyGem(), sapphire: 3, diamond: 2, onyx: 2 } },
  { id: 33, level: 1, prestige: 2, gemType: 'ruby', cost: { ...createEmptyGem(), ruby: 3, onyx: 2, emerald: 2 } },
  { id: 34, level: 1, prestige: 2, gemType: 'diamond', cost: { ...createEmptyGem(), diamond: 3, emerald: 2, sapphire: 2 } },
  { id: 35, level: 1, prestige: 2, gemType: 'onyx', cost: { ...createEmptyGem(), onyx: 3, ruby: 2, diamond: 2 } },
  { id: 36, level: 1, prestige: 0, gemType: 'emerald', cost: { ...createEmptyGem(), ruby: 2 } },
  { id: 37, level: 1, prestige: 0, gemType: 'sapphire', cost: { ...createEmptyGem(), diamond: 2 } },
  { id: 38, level: 1, prestige: 0, gemType: 'ruby', cost: { ...createEmptyGem(), onyx: 2 } },
  { id: 39, level: 1, prestige: 0, gemType: 'diamond', cost: { ...createEmptyGem(), emerald: 2 } },
  { id: 40, level: 1, prestige: 0, gemType: 'onyx', cost: { ...createEmptyGem(), sapphire: 2 } },
];

export const level2Cards: Card[] = [
  { id: 101, level: 2, prestige: 1, gemType: 'emerald', cost: { ...createEmptyGem(), sapphire: 2, diamond: 3 } },
  { id: 102, level: 2, prestige: 1, gemType: 'emerald', cost: { ...createEmptyGem(), onyx: 2, diamond: 3 } },
  { id: 103, level: 2, prestige: 2, gemType: 'emerald', cost: { ...createEmptyGem(), emerald: 5 } },
  { id: 104, level: 2, prestige: 2, gemType: 'emerald', cost: { ...createEmptyGem(), ruby: 3, sapphire: 3 } },
  { id: 105, level: 2, prestige: 3, gemType: 'emerald', cost: { ...createEmptyGem(), emerald: 3, sapphire: 2, onyx: 2 } },
  { id: 106, level: 2, prestige: 1, gemType: 'sapphire', cost: { ...createEmptyGem(), ruby: 2, emerald: 3 } },
  { id: 107, level: 2, prestige: 1, gemType: 'sapphire', cost: { ...createEmptyGem(), onyx: 2, emerald: 3 } },
  { id: 108, level: 2, prestige: 2, gemType: 'sapphire', cost: { ...createEmptyGem(), sapphire: 5 } },
  { id: 109, level: 2, prestige: 2, gemType: 'sapphire', cost: { ...createEmptyGem(), emerald: 3, diamond: 3 } },
  { id: 110, level: 2, prestige: 3, gemType: 'sapphire', cost: { ...createEmptyGem(), sapphire: 3, diamond: 2, ruby: 2 } },
  { id: 111, level: 2, prestige: 1, gemType: 'ruby', cost: { ...createEmptyGem(), emerald: 2, sapphire: 3 } },
  { id: 112, level: 2, prestige: 1, gemType: 'ruby', cost: { ...createEmptyGem(), diamond: 2, sapphire: 3 } },
  { id: 113, level: 2, prestige: 2, gemType: 'ruby', cost: { ...createEmptyGem(), ruby: 5 } },
  { id: 114, level: 2, prestige: 2, gemType: 'ruby', cost: { ...createEmptyGem(), sapphire: 3, onyx: 3 } },
  { id: 115, level: 2, prestige: 3, gemType: 'ruby', cost: { ...createEmptyGem(), ruby: 3, onyx: 2, emerald: 2 } },
  { id: 116, level: 2, prestige: 1, gemType: 'diamond', cost: { ...createEmptyGem(), sapphire: 2, ruby: 3 } },
  { id: 117, level: 2, prestige: 1, gemType: 'diamond', cost: { ...createEmptyGem(), onyx: 2, ruby: 3 } },
  { id: 118, level: 2, prestige: 2, gemType: 'diamond', cost: { ...createEmptyGem(), diamond: 5 } },
  { id: 119, level: 2, prestige: 2, gemType: 'diamond', cost: { ...createEmptyGem(), emerald: 3, onyx: 3 } },
  { id: 120, level: 2, prestige: 3, gemType: 'diamond', cost: { ...createEmptyGem(), diamond: 3, emerald: 2, sapphire: 2 } },
  { id: 121, level: 2, prestige: 1, gemType: 'onyx', cost: { ...createEmptyGem(), emerald: 2, diamond: 3 } },
  { id: 122, level: 2, prestige: 1, gemType: 'onyx', cost: { ...createEmptyGem(), ruby: 2, diamond: 3 } },
  { id: 123, level: 2, prestige: 2, gemType: 'onyx', cost: { ...createEmptyGem(), onyx: 5 } },
  { id: 124, level: 2, prestige: 2, gemType: 'onyx', cost: { ...createEmptyGem(), ruby: 3, diamond: 3 } },
  { id: 125, level: 2, prestige: 3, gemType: 'onyx', cost: { ...createEmptyGem(), onyx: 3, ruby: 2, diamond: 2 } },
  { id: 126, level: 2, prestige: 2, gemType: 'emerald', cost: { ...createEmptyGem(), emerald: 2, sapphire: 2, diamond: 2, onyx: 2 } },
  { id: 127, level: 2, prestige: 2, gemType: 'sapphire', cost: { ...createEmptyGem(), sapphire: 2, ruby: 2, diamond: 2, onyx: 2 } },
  { id: 128, level: 2, prestige: 2, gemType: 'ruby', cost: { ...createEmptyGem(), emerald: 2, ruby: 2, diamond: 2, onyx: 2 } },
  { id: 129, level: 2, prestige: 2, gemType: 'diamond', cost: { ...createEmptyGem(), emerald: 2, sapphire: 2, ruby: 2, diamond: 2 } },
  { id: 130, level: 2, prestige: 2, gemType: 'onyx', cost: { ...createEmptyGem(), emerald: 2, sapphire: 2, ruby: 2, onyx: 2 } },
];

export const level3Cards: Card[] = [
  { id: 201, level: 3, prestige: 3, gemType: 'emerald', cost: { ...createEmptyGem(), sapphire: 3, onyx: 3, diamond: 3 } },
  { id: 202, level: 3, prestige: 4, gemType: 'emerald', cost: { ...createEmptyGem(), emerald: 7 } },
  { id: 203, level: 3, prestige: 4, gemType: 'emerald', cost: { ...createEmptyGem(), emerald: 3, sapphire: 3, ruby: 3 } },
  { id: 204, level: 3, prestige: 5, gemType: 'emerald', cost: { ...createEmptyGem(), emerald: 4, sapphire: 4, diamond: 3 } },
  { id: 205, level: 3, prestige: 3, gemType: 'sapphire', cost: { ...createEmptyGem(), emerald: 3, ruby: 3, diamond: 3 } },
  { id: 206, level: 3, prestige: 4, gemType: 'sapphire', cost: { ...createEmptyGem(), sapphire: 7 } },
  { id: 207, level: 3, prestige: 4, gemType: 'sapphire', cost: { ...createEmptyGem(), sapphire: 3, diamond: 3, onyx: 3 } },
  { id: 208, level: 3, prestige: 5, gemType: 'sapphire', cost: { ...createEmptyGem(), sapphire: 4, diamond: 4, ruby: 3 } },
  { id: 209, level: 3, prestige: 3, gemType: 'ruby', cost: { ...createEmptyGem(), emerald: 3, sapphire: 3, onyx: 3 } },
  { id: 210, level: 3, prestige: 4, gemType: 'ruby', cost: { ...createEmptyGem(), ruby: 7 } },
  { id: 211, level: 3, prestige: 4, gemType: 'ruby', cost: { ...createEmptyGem(), ruby: 3, onyx: 3, emerald: 3 } },
  { id: 212, level: 3, prestige: 5, gemType: 'ruby', cost: { ...createEmptyGem(), ruby: 4, onyx: 4, sapphire: 3 } },
  { id: 213, level: 3, prestige: 3, gemType: 'diamond', cost: { ...createEmptyGem(), sapphire: 3, ruby: 3, onyx: 3 } },
  { id: 214, level: 3, prestige: 4, gemType: 'diamond', cost: { ...createEmptyGem(), diamond: 7 } },
  { id: 215, level: 3, prestige: 4, gemType: 'diamond', cost: { ...createEmptyGem(), diamond: 3, emerald: 3, sapphire: 3 } },
  { id: 216, level: 3, prestige: 5, gemType: 'diamond', cost: { ...createEmptyGem(), diamond: 4, emerald: 4, onyx: 3 } },
  { id: 217, level: 3, prestige: 3, gemType: 'onyx', cost: { ...createEmptyGem(), emerald: 3, diamond: 3, ruby: 3 } },
  { id: 218, level: 3, prestige: 4, gemType: 'onyx', cost: { ...createEmptyGem(), onyx: 7 } },
  { id: 219, level: 3, prestige: 4, gemType: 'onyx', cost: { ...createEmptyGem(), onyx: 3, emerald: 3, ruby: 3 } },
  { id: 220, level: 3, prestige: 5, gemType: 'onyx', cost: { ...createEmptyGem(), onyx: 4, ruby: 4, emerald: 3 } },
];

export const nobles: Noble[] = [
  { id: 301, prestige: 3, requirements: { ...createEmptyGem(), emerald: 4, sapphire: 4 } },
  { id: 302, prestige: 3, requirements: { ...createEmptyGem(), emerald: 4, ruby: 4 } },
  { id: 303, prestige: 3, requirements: { ...createEmptyGem(), sapphire: 4, diamond: 4 } },
  { id: 304, prestige: 3, requirements: { ...createEmptyGem(), ruby: 4, onyx: 4 } },
  { id: 305, prestige: 3, requirements: { ...createEmptyGem(), diamond: 4, onyx: 4 } },
  { id: 306, prestige: 3, requirements: { ...createEmptyGem(), emerald: 3, sapphire: 3, ruby: 3 } },
  { id: 307, prestige: 3, requirements: { ...createEmptyGem(), sapphire: 3, ruby: 3, diamond: 3 } },
  { id: 308, prestige: 3, requirements: { ...createEmptyGem(), ruby: 3, diamond: 3, onyx: 3 } },
  { id: 309, prestige: 3, requirements: { ...createEmptyGem(), diamond: 3, onyx: 3, emerald: 3 } },
  { id: 310, prestige: 3, requirements: { ...createEmptyGem(), onyx: 3, emerald: 3, sapphire: 3 } },
];

export const shuffle = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
