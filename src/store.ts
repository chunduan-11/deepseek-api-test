
import { create } from 'zustand';
import { GameState, GemType, Card } from './types';
import { initGame, canAffordCard, payForCard, checkNobles, checkGameEnd, endTurn, calculateTotalGems } from './gameLogic';

interface GameStore {
  gameState: GameState | null;
  startGame: (mode: 'ai' | 'local') => void;
  selectGem: (gem: GemType) => void;
  deselectGem: (gem: GemType) => void;
  takeGems: () => void;
  selectCard: (card: Card | null) => void;
  reserveCard: (card: Card, fromDeck?: boolean) => void;
  buyCard: (card: Card, fromReserve?: boolean) => void;
  aiTurn: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  gameState: null,

  startGame: (mode) => {
    const state = initGame(mode);
    set({ gameState: state });
  },

  selectGem: (gem) => {
    set((state) => {
      if (!state.gameState) return state;
      const currentSelected = [...state.gameState.selectedGems];
      
      if (currentSelected.includes(gem)) {
        return {
          gameState: {
            ...state.gameState,
            selectedGems: currentSelected.filter(g => g !== gem)
          }
        };
      }
      
      const uniqueSelected = [...new Set([...currentSelected, gem])];
      const gemCounts = uniqueSelected.reduce((acc, g) => {
        acc[g] = (acc[g] || 0) + 1;
        return acc;
      }, {} as Record<GemType, number>);
      
      const isSameColor = Object.values(gemCounts).some(c => c >= 2);
      const hasDifferentColors = Object.keys(gemCounts).length >= 3;
      
      if (isSameColor) {
        const color = Object.keys(gemCounts).find(k => gemCounts[k as GemType] >= 2)!;
        if (state.gameState.gems[color as GemType] >= 4 && currentSelected.length < 2) {
          return {
            gameState: {
              ...state.gameState,
              selectedGems: [...currentSelected, gem]
            }
          };
        }
      } else if (!hasDifferentColors || currentSelected.length < 3) {
        return {
          gameState: {
            ...state.gameState,
            selectedGems: [...currentSelected, gem]
          }
        };
      }
      
      return state;
    });
  },

  deselectGem: (gem) => {
    set((state) => {
      if (!state.gameState) return state;
      return {
        gameState: {
          ...state.gameState,
          selectedGems: state.gameState.selectedGems.filter(g => g !== gem)
        }
      };
    });
  },

  takeGems: () => {
    set((state) => {
      if (!state.gameState) return state;
      const currentState = state.gameState;
      const selected = currentState.selectedGems;
      
      if (selected.length === 0) return state;
      
      let newState = { ...currentState };
      const newPlayers = [...newState.players];
      const currentPlayer = { ...newPlayers[newState.currentPlayer] };
      
      const uniqueSelected = [...new Set(selected)];
      const isSameColor = uniqueSelected.length === 1 && selected.length >= 2;
      
      for (const gem of uniqueSelected) {
        const count = selected.filter(g => g === gem).length;
        const take = isSameColor ? 2 : 1;
        const available = Math.min(take, newState.gems[gem]);
        currentPlayer.gems[gem] += available;
        newState.gems[gem] -= available;
      }
      
      let total = calculateTotalGems(currentPlayer.gems);
      const gemTypes: GemType[] = ['emerald', 'sapphire', 'ruby', 'diamond', 'onyx', 'gold'];
      let i = 0;
      while (total > 10 && i < gemTypes.length) {
        if (currentPlayer.gems[gemTypes[i]] > 0) {
          currentPlayer.gems[gemTypes[i]]--;
          newState.gems[gemTypes[i]]++;
          total--;
        }
        i++;
      }
      
      newPlayers[newState.currentPlayer] = currentPlayer;
      newState.players = newPlayers;
      newState.selectedGems = [];
      
      return { gameState: endTurn(newState) };
    });
  },

  selectCard: (card) => {
    set((state) => {
      if (!state.gameState) return state;
      return {
        gameState: {
          ...state.gameState,
          selectedCard: card
        }
      };
    });
  },

  reserveCard: (card, fromDeck) => {
    set((state) => {
      if (!state.gameState) return state;
      const currentState = state.gameState;
      const newState = { ...currentState };
      const newPlayers = [...newState.players];
      const currentPlayer = { ...newPlayers[newState.currentPlayer] };
      
      if (currentPlayer.reservedCards.length >= 3) return state;
      
      let reservedCard: Card;
      if (fromDeck) {
        const level = Math.floor(Math.random() * 3) + 1 as 1 | 2 | 3;
        const deckKey = `level${level}` as const;
        const deck = newState.deck[deckKey];
        if (deck.length === 0) return state;
        reservedCard = { ...deck[0], isReserved: true };
        newState.deck[deckKey] = deck.slice(1);
      } else {
        reservedCard = { ...card, isReserved: true };
        const levelKey = `level${card.level}` as const;
        newState.board[levelKey] = newState.board[levelKey].filter(c => c.id !== card.id);
        const deck = newState.deck[levelKey];
        if (deck.length > 0) {
          newState.board[levelKey].push(deck[0]);
          newState.deck[levelKey] = deck.slice(1);
        }
      }
      
      currentPlayer.reservedCards.push(reservedCard);
      
      if (newState.gems.gold > 0) {
        currentPlayer.gems.gold++;
        newState.gems.gold--;
      }
      
      let total = calculateTotalGems(currentPlayer.gems);
      const gemTypes: GemType[] = ['emerald', 'sapphire', 'ruby', 'diamond', 'onyx', 'gold'];
      let i = 0;
      while (total > 10 && i < gemTypes.length) {
        if (currentPlayer.gems[gemTypes[i]] > 0) {
          currentPlayer.gems[gemTypes[i]]--;
          newState.gems[gemTypes[i]]++;
          total--;
        }
        i++;
      }
      
      newPlayers[newState.currentPlayer] = currentPlayer;
      newState.players = newPlayers;
      newState.selectedCard = null;
      
      return { gameState: endTurn(newState) };
    });
  },

  buyCard: (card, fromReserve) => {
    set((state) => {
      if (!state.gameState) return state;
      const currentState = state.gameState;
      const newState = { ...currentState };
      const newPlayers = [...newState.players];
      const currentPlayer = { ...newPlayers[newState.currentPlayer] };
      
      if (!canAffordCard(currentPlayer, card)) return state;
      
      const { gems: newGems, paidGems } = payForCard(currentPlayer, card);
      currentPlayer.gems = newGems;
      
      const gemTypes: GemType[] = ['emerald', 'sapphire', 'ruby', 'diamond', 'onyx', 'gold'];
      for (const gem of gemTypes) {
        newState.gems[gem] += paidGems[gem];
      }
      
      currentPlayer.ownedCards.push(card);
      currentPlayer.bonuses[card.gemType]++;
      currentPlayer.prestige += card.prestige;
      
      if (fromReserve) {
        currentPlayer.reservedCards = currentPlayer.reservedCards.filter(c => c.id !== card.id);
      } else {
        const levelKey = `level${card.level}` as const;
        newState.board[levelKey] = newState.board[levelKey].filter(c => c.id !== card.id);
        const deck = newState.deck[levelKey];
        if (deck.length > 0) {
          newState.board[levelKey].push(deck[0]);
          newState.deck[levelKey] = deck.slice(1);
        }
      }
      
      let noble = checkNobles(currentPlayer, newState.board.nobles);
      while (noble) {
        currentPlayer.nobles.push(noble);
        currentPlayer.prestige += noble.prestige;
        newState.board.nobles = newState.board.nobles.filter(n => n.id !== noble.id);
        noble = checkNobles(currentPlayer, newState.board.nobles);
      }
      
      newPlayers[newState.currentPlayer] = currentPlayer;
      newState.players = newPlayers;
      newState.selectedCard = null;
      
      return { gameState: endTurn(checkGameEnd(newState)) };
    });
  },

  aiTurn: () => {
    set((state) => {
      if (!state.gameState) return state;
      const currentState = state.gameState;
      
      if (currentState.players[currentState.currentPlayer].isAI) {
        let newState = { ...currentState };
        
        setTimeout(() => {
          const { gameState } = get();
          if (!gameState) return;
          
          const aiPlayer = gameState.players[gameState.currentPlayer];
          if (!aiPlayer.isAI) return;
          
          let actionTaken = false;
          
          for (const level of [3, 2, 1] as const) {
            const cards = gameState.board[`level${level}`];
            for (const card of cards) {
              if (canAffordCard(aiPlayer, card)) {
                get().buyCard(card);
                actionTaken = true;
                break;
              }
            }
            if (actionTaken) break;
          }
          
          if (!actionTaken) {
            for (const card of aiPlayer.reservedCards) {
              if (canAffordCard(aiPlayer, card)) {
                get().buyCard(card, true);
                actionTaken = true;
                break;
              }
            }
          }
          
          if (!actionTaken && aiPlayer.reservedCards.length < 3) {
            const allCards = [...gameState.board.level3, ...gameState.board.level2, ...gameState.board.level1];
            if (allCards.length > 0) {
              const randomCard = allCards[Math.floor(Math.random() * allCards.length)];
              get().reserveCard(randomCard);
              actionTaken = true;
            }
          }
          
          if (!actionTaken) {
            const gemTypes: GemType[] = ['emerald', 'sapphire', 'ruby', 'diamond', 'onyx'];
            const available = gemTypes.filter(g => gameState.gems[g] > 0);
            const take = available.slice(0, Math.min(3, available.length));
            take.forEach(g => get().selectGem(g));
            get().takeGems();
          }
        }, 1000);
      }
      
      return state;
    });
  }
}));
