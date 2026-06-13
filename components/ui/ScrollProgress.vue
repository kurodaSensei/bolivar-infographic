<script setup>
import { computed } from 'vue'
const { progress } = useScrollProgress()
const scale = computed(() => progress.value)
</script>

<template>
  <div class="scroll-progress" :style="{ transform: `scaleX(${scale})` }" aria-hidden="true" />
</template>

<style scoped>
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  z-index: 9999;
  background: linear-gradient(90deg, var(--gold), var(--crisis));
  transform-origin: 0 50%;
  box-shadow: 0 0 8px var(--crisis-glow);
  transition: transform 0.05s linear;
}
</style>
