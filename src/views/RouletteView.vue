<script setup lang="ts">
import Roulette from "@/components/Roulette.vue";
import Placing from "../components/Placing.vue";
</script>

<template>
  <div class="roulette-view">
    <Roulette />
    <Placing />
  </div>
</template>

<style lang="scss">
.roulette-view {
  display: flex;
}
</style>
