<template>
  <div class="placing">
    <div>
      <h1 class="info">Welcome to Roulette. Phase: {{ gameState }}</h1>
      <h2 class="credit">Your current Credit: {{ userCredit }}</h2>
      <h3>Select a number or combination to select and click "roll"</h3>
    </div>

    <div class="placing__field">
      <div class="field-container">
        <div class="field-row">
          <div @click="newBet([0])">0</div>
        </div>

        <div class="field-row">
          <div @click="newBet(passeNumbers)">Passe</div>
          <div class="field-row__sub-fields">
            <div v-for="n in premierNumbers" :key="n" @click="newBet([n])">
              {{ n }}
            </div>
          </div>
          <div @click="newBet(manqueNumbers)">Manque</div>
        </div>

        <div class="field-row">
          <div @click="newBet(pairNumbers)">Pair</div>
          <div class="field-row__sub-fields">
            <div v-for="n in milieuNumbers" :key="n" @click="newBet([n])">
              {{ n }}
            </div>
          </div>
          <div @click="newBet(impairNumbers)">Impair</div>
        </div>

        <div class="field-row">
          <div @click="newBet(blackNumbers)">Black</div>
          <div class="field-row__sub-fields">
            <div v-for="n in dernierNumbers" :key="n" @click="newBet([n])">
              {{ n }}
            </div>
          </div>
          <div @click="newBet(redNumbers)">Red</div>
        </div>

        <div class="field-row">
          <div class="field-row__sub-fields">
            <div @click="newBet(premierNumbers)">12 P</div>
            <div @click="newBet(milieuNumbers)">12 M</div>
            <div @click="newBet(dernierNumbers)">12 D</div>
          </div>
          <div class="field-row__sub-fields">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div class="field-row__sub-fields">
            <div @click="newBet(dernierNumbers)">12 D</div>
            <div @click="newBet(milieuNumbers)">12 M</div>
            <div @click="newBet(premierNumbers)">12 P</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useGameStore, type UserBet } from "@/stores/game";
import type { fieldNumber } from "@/utils/roulette";
import {
  blackNumbers,
  redNumbers,
  pairNumbers,
  impairNumbers,
  manqueNumbers,
  passeNumbers,
  premierNumbers,
  milieuNumbers,
  dernierNumbers,
} from "@/utils/roulette";

const gameStore = useGameStore();

const gameState = computed(() => gameStore.getGameState);
const userCredit = computed(() => gameStore.userCredits);

function newBet(fields: fieldNumber[]): void {
  const bet: UserBet = {
    credit: 10,
    fieldsNumbers: fields,
  };
  gameStore.placeBet(bet);
}
</script>

<style scoped lang="scss">
.placing {
  width: 100%;
  margin: 0 32px;

  display: flex;
  flex-flow: column;
  justify-content: space-evenly;

  &__field {
    width: 100%;
    align-self: center;
    background-color: green;
    border: 2px solid black;
    box-shadow: 5px 5px 5px rgba($color: #000000, $alpha: 0.3);

    .field-container {
      background-color: green;
      border: 2px solid gold;
      border-radius: 4px;
      width: 50%;

      margin-left: auto;
      margin-right: auto;
      .field-row {
        display: flex;
        width: 100%;

        text-align: center;

        border-bottom: 2px solid gold;
        &:nth-last-child(1) {
          border-bottom: 0;
        }
        &:hover {
          cursor: pointer;
        }

        & > div {
          width: 100%;

          border-right: 2px solid gold;

          &:nth-last-child(1) {
            border-right: 0;
          }
        }

        &__sub-fields {
          display: grid;

          grid-template-columns: repeat(3, 1fr);

          div {
            border-right: 2px solid gold;
            border-bottom: 2px solid gold;

            &:nth-child(3n) {
              border-right: 0;
            }

            &:nth-last-child(-n + 3) {
              border-bottom: 0;
            }
          }
        }
      }
    }
  }
}
</style>
