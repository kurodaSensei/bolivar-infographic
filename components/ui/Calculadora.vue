<script setup>
import { ref } from 'vue'

const { ERAS, RATES, convertTo, toUSD, formatVenezuela, formatUSD } = useMonetaryData()

const era = ref('bsd')
const amountRaw = ref('1000000')
const shown = ref(false)
const result = ref(null)

function calcular () {
  const n = parseFloat(amountRaw.value)
  if (!Number.isFinite(n) || n <= 0) {
    shown.value = false
    return
  }
  result.value = {
    bs:  convertTo(n, era.value, 'bs'),
    bsf: convertTo(n, era.value, 'bsf'),
    bss: convertTo(n, era.value, 'bss'),
    bsd: convertTo(n, era.value, 'bsd'),
    usd: toUSD(n, era.value)
  }
  shown.value = true
}
</script>

<template>
  <div class="calc-grid">
    <div class="calc-panel">
      <label class="calc-label" for="calc-era">Moneda y año de origen</label>
      <select id="calc-era" v-model="era" class="calc-select">
        <option v-for="e in ERAS" :key="e.id" :value="e.id">{{ e.label }}</option>
      </select>

      <label class="calc-label" for="calc-amount">Monto</label>
      <input
        id="calc-amount"
        v-model="amountRaw"
        class="calc-input"
        type="number"
        placeholder="1000000"
        min="0"
        inputmode="decimal"
        @keydown.enter="calcular"
      >

      <button class="calc-btn" @click="calcular">CALCULAR EQUIVALENCIAS</button>

      <div class="result-panel" :class="{ show: shown }">
        <div class="result-row">
          <span class="result-row-label">Bs. original (antes 2008)</span>
          <span class="result-row-val">{{ result ? formatVenezuela(result.bs) : '' }} Bs</span>
        </div>
        <div class="result-row">
          <span class="result-row-label">Bs. Fuertes (2008)</span>
          <span class="result-row-val">{{ result ? formatVenezuela(result.bsf) : '' }} Bs.F</span>
        </div>
        <div class="result-row">
          <span class="result-row-label">Bs. Soberanos (2018)</span>
          <span class="result-row-val">{{ result ? formatVenezuela(result.bss) : '' }} Bs.S</span>
        </div>
        <div class="result-row">
          <span class="result-row-label">Bs. Digitales (hoy)</span>
          <span class="result-row-val">{{ result ? formatVenezuela(result.bsd) : '' }} Bs.D</span>
        </div>
        <div class="result-row">
          <span class="result-row-label">Equivalente USD (approx.)</span>
          <span class="result-row-val crisis">{{ result ? formatUSD(result.usd) : '' }}</span>
        </div>
      </div>
    </div>

    <div class="calc-info">
      <strong class="info-title">Tasas de conversión oficiales</strong>
      <p><strong>2008 (Bs → Bs.F):</strong> ÷ 1.000 (−3 ceros)</p>
      <p><strong>2018 (Bs.F → Bs.S):</strong> ÷ 100.000 (−5 ceros)</p>
      <p><strong>2021 (Bs.S → Bs.D):</strong> ÷ 1.000.000 (−6 ceros)</p>
      <p><strong>Total acumulado:</strong> 1 Bs.D = 10<sup>14</sup> Bs originales</p>
      <p class="info-disclaimer">Las equivalencias en USD son aproximadas y usan tasas de referencia históricas del BCV. La inflación intracambiaria no está incluida.</p>
    </div>
  </div>
</template>

<style scoped>
.calc-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-m);
  align-items: start;
}
@media (max-width: 720px) {
  .calc-grid { grid-template-columns: 1fr; }
}

.calc-panel {
  background: var(--ink-2);
  border: 1px solid var(--wire);
  border-radius: 16px;
  padding: 28px;
}
.calc-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--muted);
  display: block;
  margin-bottom: 10px;
}
.calc-select,
.calc-input {
  width: 100%;
  background: var(--ink-3);
  border: 1px solid var(--wire);
  border-radius: 8px;
  color: var(--bright);
  font-family: 'JetBrains Mono', monospace;
  font-size: 18px;
  padding: 12px 16px;
  outline: none;
  margin-bottom: 20px;
  appearance: none;
  transition: border-color 0.2s;
}
.calc-select:focus,
.calc-input:focus { border-color: var(--gold); }

.calc-btn {
  width: 100%;
  background: linear-gradient(135deg, var(--crisis), #c1121f);
  border: none;
  border-radius: 8px;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 600;
  padding: 14px;
  cursor: pointer;
  letter-spacing: 0.04em;
  transition: opacity 0.2s, transform 0.1s;
}
.calc-btn:hover { opacity: 0.88; }
.calc-btn:active { transform: scale(0.98); }

.result-panel {
  background: var(--ink-3);
  border: 1px solid var(--wire);
  border-radius: 12px;
  padding: 24px;
  margin-top: 20px;
  display: none;
}
.result-panel.show { display: block; }
.result-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 10px 0;
  border-bottom: 1px solid var(--wire);
  gap: 12px;
}
.result-row:last-child { border-bottom: none; }
.result-row-label { font-size: 13px; color: var(--dim); }
.result-row-val {
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px;
  font-weight: 700;
  color: var(--gold);
  text-align: right;
  word-break: break-word;
}
.result-row-val.crisis { color: var(--crisis); }

.calc-info {
  font-size: 14px;
  color: var(--dim);
  line-height: 1.6;
  background: var(--ink-2);
  border: 1px solid var(--wire);
  border-left: 3px solid var(--data);
  border-radius: 8px;
  padding: 16px 20px;
}
.calc-info p { margin-bottom: 12px; }
.calc-info p strong { color: var(--text); }
.info-title {
  color: var(--data);
  display: block;
  margin-bottom: 10px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
.info-disclaimer { color: var(--muted); font-size: 13px; margin-bottom: 0 !important; }
</style>
