<template>
  <div class="roulette">
    <div>roulette table: {{ gameState }} || $${{ userCredit }}$$</div>
    <div id="chart1"></div>
    <div @click="rollBalls()">Roll ball</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
/// @ts-expect-error TODO
import { GoogleCharts } from "google-charts";

import {
  type Field,
  blackNumbers,
  FieldColor,
  redNumbers,
  fieldOrder,
  type fieldNumber,
} from "@/utils/roulette";
import { getRandomArbitrary } from "@/utils/helper";
import { GameState, useGameStore } from "@/stores/game";

const gameStore = useGameStore();

const gameState = computed(() => gameStore.getGameState);
const userCredit = computed(() => gameStore.userCredits);

//Load the charts library with a callback
GoogleCharts.load(drawChart);

let roulette_chart: any;

const googlePieChartDataTable = computed(() => {
  return GoogleCharts.api.visualization.arrayToDataTable([
    ["label", "value"],
    ...fieldOrder.map((n) => [n.toString(), 1]),
  ]);
});

function drawChart() {
  // Standard google charts functionality is available as GoogleCharts.api after load
  const data = googlePieChartDataTable.value;

  const options = {
    height: 600,
    width: 600,
    legend: "none",
    enableInteractivity: false,
    pieSliceText: "label",
    tooltip: { trigger: "none" },
    pieHole: 0.8,
    colors: ["black", "red"],
    slices: { 0: { color: "green" } },
    pieStartAngle: -5,
  };

  roulette_chart = new GoogleCharts.api.visualization.PieChart(
    document.getElementById("chart1")
  );

  roulette_chart.draw(data, options);
}

/**
 * function to select numbers by random
 *
 * @param balls number of balls
 * @param intervall time in seconds a ball stays at a field
 * @param iteration range min/max of possible iterations of 1 ball
 */
async function rollBalls(
  balls = 1,
  intervall = 0.5,
  iteration = [1, 30]
): Promise<void> {
  let selectedField: fieldNumber | undefined = undefined;

  if (gameState.value !== GameState.placing) {
    return;
  }

  gameStore.setGameState(GameState.rolling);

  const intervallSeconds = intervall * 1000;
  for (let i = 0; i < balls; i++) {
    const iterations = getRandomArbitrary(iteration[0], iteration[1]);

    const delay = (ms: number | undefined) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    await (async function loop() {
      for (let j = 0; j < iterations; j++) {
        await delay(intervallSeconds);
        selectedField = fieldOrder[j];

        roulette_chart.setSelection([{ row: j, column: null }]);
      }
    })();
  }

  gameStore.setCurrentSelectedNumber(selectedField);
  gameStore.setGameState(GameState.evaluation);
  gameStore.evaluate();
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
}
</style>
