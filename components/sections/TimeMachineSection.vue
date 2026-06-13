<script setup>
// S6 — La Máquina del Tiempo. Sin reveal ni count-up: el número grande
// se muestra estático desde el render.

const TARGET = 1e14 // 100.000.000.000.000
const display = Math.round(TARGET).toLocaleString('es-VE')
</script>

<template>
  <section id="timemachine" class="section-wrap timemachine">
    <div class="section-inner" style="text-align:center">
      <p class="eyebrow" style="margin-bottom:24px">La máquina del tiempo</p>
      <div>
        <span class="tm-number">{{ display }}</span>
        <span class="tm-unit">bolívares de 2007</span>
      </div>
      <p class="tm-body">
        Con <strong>1 bolívar digital de hoy</strong>, si viajaras al 2007, tendrías 100 billones de bolívares —
        suficiente para comprar más de <strong>45.000 millones de dólares</strong> a la tasa Cadivi de ese año.
      </p>
      <p class="tm-punchline">Solo depende de cuándo los tienes</p>
    </div>
  </section>
</template>

<style scoped>
.timemachine {
  background: var(--ink-2);
  text-align: center;
  border-top: 1px solid var(--wire);
  border-bottom: 1px solid var(--wire);
}
.tm-number {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(40px, 9vw, 110px);
  font-weight: 700;
  color: var(--bright);
  line-height: 1;
  letter-spacing: -0.03em;
  display: inline-block;
  word-break: break-word;
}
.tm-unit {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(14px, 2vw, 20px);
  color: var(--muted);
  letter-spacing: 0.1em;
  display: block;
  margin-top: 16px;
  margin-bottom: 32px;
}
.tm-body {
  max-width: 44ch;
  margin: 0 auto 40px;
  font-family: 'Playfair Display', serif;
  font-size: clamp(18px, 2.5vw, 26px);
  line-height: 1.55;
  color: var(--text);
}
.tm-body strong { color: var(--gold); }
.tm-punchline {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(12px, 1.6vw, 15px);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
}
</style>
