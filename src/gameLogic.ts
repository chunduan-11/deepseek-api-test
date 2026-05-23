
import { GameState, Player, Card, Noble, Gem, GemType } from './types';
import { createEmptyGem, shuffle, level1Cards, level2Cards, level3Cards, nobles } from './gameData';

export const initGame = (mode: 'ai' | 'local'): GameState => {
  const shuffledL1 = shuffle([...level1Cards]);
  const shuffledL2 = shuffle([...level2Cards]);
  const shuffledL3 = shuffle([...level3Cards]);
  const shuffledNobles = shuffle([...nobles]);
  
  const playerCount = 2;
  const gemCount = playerCount === 2 ? 4 : playerCount === 3 ? 5 : 7;
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    currentPlayer: 0,
    phase: 'playing',
    winner: null,
    mode,
    players: [
      {
        id: 0,
        name: '玩家 1',
        isAI: false,
        prestige: 0,
        gems: createEmptyGem(),
        bonuses: createEmptyGem(),
        ownedCards: [],
        nobles: [],
        reservedCards: [],
      },
      {
        id: 1,
        name: mode === 'ai' ? 'AI 对手' : '玩家 2',
        isAI: mode === 'ai',
        prestige: 0,
        gems: createEmptyGem(),
        bonuses: createEmptyGem(),
        ownedCards: [],
        nobles: [],
        reservedCards: [],
      },
    ],
    deck: {
      level1: shuffledL1.slice(4),
      level2: shuffledL2.slice(4),
      level3: shuffledL3.slice(4),
    },
    board: {
      level1: shuffledL1.slice(0, 4),
      level2: shuffledL2.slice(0, 4),
      level3: shuffledL3.slice(0, 4),
      nobles: shuffledNobles.slice(0, playerCount + 1),
    },
    gems: {
      emerald: gemCount,
      sapphire: gemCount,
      ruby: gemCount,
      diamond: gemCount,
      onyx: gemCount,
      gold: 5,
    },
    selectedGems: [],
    selectedCard: null,
  };
};

export const calculateTotalGems = (gems: Gem): number => {
  return gems.emerald + gems.sapphire + gems.ruby + gems.diamond + gems.onyx + gems.gold;
};

export const canAffordCard = (player: Player, card: Card): boolean => {
  const gemTypes: GemType[] = ['emerald', 'sapphire', 'ruby', 'diamond', 'onyx'];
  let goldNeeded = 0;
  
  for (const type of gemTypes) {
    const required = card.cost[type];
    const available = player.gems[type] + player.bonuses[type];
    if (available < required) {
      goldNeeded += required - available;
    }
  }
  
  return player.gems.gold >= goldNeeded;
};

export const payForCard = (player: Player, card: Card): { gems: Gem; paidGems: Gem } => {
  const newGems = { ...player.gems };
  const paidGems = createEmptyGem();
  const gemTypes: GemType[] = ['emerald', 'sapphire', 'ruby', 'diamond', 'onyx'];
  
  for (const type of gemTypes) {
    let required = card.cost[type];
    const bonus = player.bonuses[type];
    
    required = Math.max(0, required - bonus);
    
    const canPay = Math.min(required, newGems[type]);
    newGems[type] -= canPay;
    paidGems[type] = canPay;
    required -= canPay;
    
    if (required > 0) {
      newGems.gold -= required;
      paidGems.gold += required;
    }
  }
  
  return { gems: newGems, paidGems };
};

export const checkNobles = (player: Player, availableNobles: Noble[]): Noble | null => {
  for (const noble of availableNobles) {
    let meets = true;
    for (const [type, required] of Object.entries(noble.requirements)) {
      if (player.bonuses[type as GemType] < required) {
        meets = false;
        break;
      }
    }
    if (meets) return noble;
  }
  return null;
};

export const checkGameEnd = (state: GameState): GameState => {
  let anyWinner = state.players.some(p => p.prestige >= 15);
  if (anyWinner) {
    let maxPrestige = Math.max(...state.players.map(p => p.prestige));
    let candidates = state.players.filter(p => p.prestige === maxPrestige);
    let winner = candidates.reduce((prev, curr) => 
      prev.ownedCards.length < curr.ownedCards.length ? prev : curr
    );
    
    return {
      ...state,
      phase: 'ended',
      winner: winner.id
    };
  }
  return state;
};

export const endTurn = (state: GameState): GameState => {
  let newState = { ...state };
  const newPlayerIndex = (state.currentPlayer + 1) % state.players.length;
  newState.currentPlayer = newPlayerIndex;
  newState.selectedGems = [];
  newState.selectedCard = null;
  return checkGameEnd(newState);
};
