<script setup>
// Comparador regional — Venezuela siempre visible como referencia.
// El país seleccionado anima width con CSS transition de 1s.
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  countries: { type: Array, required: true },
  defaultCode: { type: String, default: 'co' }
})

const selected = ref(props.defaultCode)
const current = computed(() => props.countries.find(c => c.code === selected.value))

function select (code) { selected.value = code }
</script>

<template>
  <div>
    <div class="country-chips" role="tablist" aria-label="Países">
      <button
        v-for="c in countries"
        :key="c.code"
        class="chip"
        :class="{ active: selected === c.code }"
        :aria-pressed="selected === c.code"
        @click="select(c.code)"
      >
        {{ c.flag }} {{ c.name }}
      </button>
    </div>

    <div class="bar-chart">
      <!-- Venezuela siempre visible -->
      <div class="bar-row">
        <div class="bar-name venezuela">🇻🇪 Venezuela</div>
        <div class="bar-track">
          <div class="bar-fill venezuela" style="width:0.01%; min-width:2px">~$0</div>
        </div>
        <div class="bar-usd crisis">≈ $0.000001</div>
      </div>

      <div v-if="current" class="bar-row">
        <div class="bar-name">{{ current.flag }} {{ current.name }}</div>
        <div class="bar-track">
          <div
            class="bar-fill selected"
            :style="{ width: current.retained + '%' }"
          >${{ current.retained }}</div>
        </div>
        <div class="bar-usd">${{ current.retained }} de $100</div>
      </div>
    </div>

    <p v-if="current && current.note" class="comparador-note">{{ current.note }}</p>
  </div>
</template>

<style scoped>
.country-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 32px;
}
.chip {
  padding: 7px 16px;
  border-radius: 999px;
  border: 1px solid var(--wire);
  background: var(--ink-3);
  color: var(--dim);
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}
.chip:hover { border-color: var(--gold); color: var(--gold); }
.chip.active {
  background: var(--gold-dim);
  border-color: var(--gold);
  color: var(--gold);
  font-weight: 700;
}

.bar-chart { display: flex; flex-direction: column; gap: 12px; }
.bar-row { display: flex; align-items: center; gap: 12px; }
.bar-name {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--text);
  width: 110px;
  flex-shrink: 0;
  text-align: right;
}
.bar-name.venezuela { color: var(--crisis); }
.bar-track {
  flex: 1;
  background: var(--wire);
  border-radius: 4px;
  height: 32px;
  position: relative;
  overflow: hidden;
}
.bar-fill {
  height: 100%;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding-left: 12px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  transition: width 1s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.bar-fill.venezuela {
  background: var(--crisis);
  color: rgba(255, 255, 255, 0.8);
}
.bar-fill.selected {
  background: var(--data);
  color: rgba(10, 10, 15, 0.9);
}
.bar-usd {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--muted);
  width: 110px;
  flex-shrink: 0;
  text-align: left;
}
.bar-usd.crisis { color: var(--crisis); }

.comparador-note {
  font-size: 13px;
  color: var(--muted);
  margin-top: 28px;
  line-height: 1.6;
  font-style: italic;
}

@media (max-width: 520px) {
  .bar-name, .bar-usd { width: 90px; font-size: 11px; }
}
</style>
