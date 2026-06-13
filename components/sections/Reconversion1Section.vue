<script setup>
// S2 — Reconversión 1. Sin animaciones de entrada — los números están desde el render.
</script>

<template>
  <section id="r1" class="section-wrap r1">
    <div class="section-inner" style="text-align:center">
      <p class="reconv-era">Reconversión · 1 de enero de 2008</p>
      <h2 class="reconv-name">Bolívar Fuerte</h2>

      <div class="transform-row">
        <span class="num-old">1.000.000</span>
        <span class="num-arrow">→</span>
        <span class="num-new">1.000</span>
      </div>

      <div class="badge-wrap">
        <span class="ceros-badge">− 3 ceros</span>
      </div>

      <div class="fact-card">
        <div class="fact-label">El dato</div>
        <p class="fact-text">
          La suma de <em>todos</em> los billetes en circulación — 2 + 5 + 10 + 20 + 50 + 100 — equivalía, junta, a <em>un dólar</em>.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.r1 {
  background: linear-gradient(160deg, var(--ink) 0, #0d0810 100%);
  text-align: center;
}
.badge-wrap { margin-bottom: 44px; }
</style>
