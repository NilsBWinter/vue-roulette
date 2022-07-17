import { winQuota, type fieldNumber } from '@/utils/roulette';
import { defineStore } from 'pinia'

export enum GameState {
    placing = 'placing',
    rolling = 'rolling',
    evaluation = 'evaluation'
}

export interface UserBet {
    credit: number;
    fieldsNumbers: fieldNumber[];
}

export interface Game{
    gameState: GameState;
    currentSelectedNumber: fieldNumber | undefined;

    userCredits: number;
    userBettings: UserBet[];
}

export const useGameStore = defineStore({
  id: 'game',
  state: (): Game => ({
    gameState: GameState.placing,
    currentSelectedNumber: undefined,
    userCredits: 100,
    userBettings: [],
  }),
  getters: {
    getGameState: (state) => state.gameState,
    getUserBettings: (state) => state.userBettings,
  },
  actions: {
    setGameState(newState: GameState) {
      this.gameState = newState;
    },
    setCurrentSelectedNumber(number: fieldNumber | undefined) {
        if (this.gameState !== GameState.rolling) { 
            return;
        }
        this.currentSelectedNumber = number;
    },
    placeBet(bet: UserBet) {
        if (this.gameState !== GameState.placing) { 
            return;
        }
        this.userCredits -= bet.credit;
        this.userBettings.push(bet);
    },
    evaluate() {
        if (this.gameState === GameState.evaluation) { 
            const winAmount = 0;

            this.userBettings.forEach((b) => {
                const value = winQuota(b.fieldsNumbers) * b.credit + b.credit;
                // win
                if(this.currentSelectedNumber && b.fieldsNumbers.includes(this.currentSelectedNumber)) {
                    this.userCredits += value;
                } else {
                    this.userCredits -= value;

                }

            })
        }

        this.userBettings = [];

        this.gameState = GameState.placing;
    }
  }
})
