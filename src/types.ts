
export type GemType = 'emerald' | 'sapphire' | 'ruby' | 'diamond' | 'onyx' | 'gold';

export interface Gem {
  emerald: number;
  sapphire: number;
  ruby: number;
  diamond: number;
  onyx: number;
  gold: number;
}

export interface Card {
  id: number;
  level: 1 | 2 | 3;
  prestige: number;
  gemType: GemType;
  cost: Gem;
  isReserved?: boolean;
}

export interface Noble {
  id: number;
  prestige: number;
  requirements: Gem;
}

export interface Player {
  id: number;
  name: string;
  isAI: boolean;
  prestige: number;
  gems: Gem;
  bonuses: Gem;
  ownedCards: Card[];
  nobles: Noble[];
  reservedCards: Card[];
}

export interface GameState {
  id: string;
  currentPlayer: number;
  phase: 'setup' | 'playing' | 'ended';
  winner: number | null;
  players: Player[];
  deck: {
    level1: Card[];
    level2: Card[];
    level3: Card[];
  };
  board: {
    level1: Card[];
    level2: Card[];
    level3: Card[];
    nobles: Noble[];
  };
  gems: Gem;
  selectedGems: GemType[];
  selectedCard: Card | null;
  mode: 'ai' | 'local';
}

export type ActionType = 
  | { type: 'take_gems'; gems: GemType[] }
  | { type: 'reserve_card'; card: Card; fromDeck?: boolean }
  | { type: 'buy_card'; card: Card; fromReserve?: boolean }
  | { type: 'end_turn' };
