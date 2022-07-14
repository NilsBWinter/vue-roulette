<template>
  <div class="roulette">
    <div>roulette table</div>
    <div id="chart1"></div>
    <!-- <div>
      <div
        v-for="f in fieldOrder"
        :key="f"
        class="roulette__field"
        :class="[
          `roulette__field--${allFieldsMap.get(f)?.color}`,
          highlightedFields.includes(f)
            ? 'roulette__field--highlighted'
            : undefined,
        ]"
      >
        {{ allFieldsMap.get(f)?.number }}
      </div>
    </div> -->

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
} from "@/utils/roulette";
import { getRandomArbitrary } from "@/utils/helper";

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
    height: 1000,
    legend: "none",
    enableInteractivity: false,
    pieSliceText: "label",
    tooltip: { trigger: "none" },
    pieHole: 0.8,
    colors: ["red", "black"],
    slices: { 0: { color: "green" } },
    pieStartAngle: -5,
  };

  roulette_chart = new GoogleCharts.api.visualization.PieChart(
    document.getElementById("chart1")
  );

  roulette_chart.draw(data, options);
}

const blackNumbersFields = computed((): Field[] =>
  blackNumbers.map((n) => {
    return {
      number: n,
      color: FieldColor.BLACK,
      highlighted: false,
    };
  })
);

const redNumbersFields = computed((): Field[] =>
  redNumbers.map((n) => {
    return {
      number: n,
      color: FieldColor.RED,
      highlighted: false,
    };
  })
);

const allFields = computed((): Field[] => [
  {
    number: 0,
    color: FieldColor.BLANK,
    highlighted: false,
  },
  ...blackNumbersFields.value,
  ...redNumbersFields.value,
]);

const allFieldsMap = computed(() => {
  const map: Map<number, Field> = new Map();
  allFields.value.forEach((f) => map.set(f.number, f));
  return map;
});

// user slected fields
const selectedFields = ref<number[]>([]);
// fields the balls are rolling on right now
const rollingFields = ref<number[]>([]);
// fields finally selected by the algorythm
const resultFields = ref<number[]>([]);

// fields highlighted in the ui
// TODO: set game states in stae rolling -> rollingFields in state result = resultfields
const highlightedFields = computed(() => rollingFields.value);

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
  const intervallSeconds = intervall * 1000;
  for (let i = 0; i < balls; i++) {
    const iterations = getRandomArbitrary(iteration[0], iteration[1]);

    const delay = (ms: number | undefined) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    (async function loop() {
      for (let j = 0; j < iterations; j++) {
        await delay(intervallSeconds);
        rollingFields.value = [fieldOrder[j]];

        roulette_chart.setSelection([{ row: j, column: null }]);
      }
    })();
  }
}
</script>

<style lang="scss">
.roulette {
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
