<template>
  <div class="roulette">
    <div class="field-container">
      <div class="field-row">
        <div @click="newBet([0])">0</div>
      </div>

      <div class="field-row">
        <div @click="newBet(passeNumbers)">Passe</div>
        <div class="field-row__sub-fields">
          <div v-for="n in premierNumbers" :key="n" @click="newBet([n])">{{ n }}</div>
        </div>
        <div @click="newBet(manqueNumbers)">Manque</div>
      </div>

      <div class="field-row">
        <div @click="newBet(pairNumbers)">Pair</div>
        <div class="field-row__sub-fields">
          <div v-for="n in milieuNumbers" :key="n " @click="newBet([n])">
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
        <div>
          <div @click="newBet(premierNumbers)">12 P</div>
          <div @click="newBet(milieuNumbers)">12 M</div>
          <div @click="newBet(dernierNumbers)">12 D</div>
        </div>
        <div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div>
          <div @click="newBet(dernierNumbers)">12 D</div>
          <div @click="newBet(milieuNumbers)">12 M</div>
          <div @click="newBet(premierNumbers)">12 P</div>
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

function newBet(fields: fieldNumber[]): void {
  const bet: UserBet = {
    credit: 10,
    fieldsNumbers: fields,
  };
  gameStore.placeBet(bet);
}
</script>

<style scoped lang="scss">
.roulette {
  width: 100%;
  background-color: green;

  &__field {
    color: white;
    &--blank {
      background: rgba(0, 0, 0, 0);
    }

    &--red {
      background: rgba(255, 0, 0, 1);
    }

    &--black {
      background: rgba(0, 0, 0, 1);
    }

    &--highlighted {
      background-color: gold;
    }
  }

  .field-row {
    display: flex;
    width: 100%;

    text-align: center;

    &:hover {
      cursor: pointer;
    }

    div {
      width: 100%;
      border: 1px solid gold;
    }

    &__sub-fields {
      display: grid;

      grid-template-columns: repeat(3, 1fr);

      div {
        border: 1px solid gold;
      }
    }
  }
}
</style>
