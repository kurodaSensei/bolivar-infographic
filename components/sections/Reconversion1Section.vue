<script setup>
// S2 — Reconversión 1. Reveal stagger via IntersectionObserver.
import { ref } from 'vue'

const root = ref(null)
useReveal(root)
</script>

<template>
  <section id="r1" ref="root" class="section-wrap r1">
    <div class="section-inner" style="text-align:center">
      <p class="reconv-era reveal">Reconversión · 1 de enero de 2008</p>
      <h2 class="reconv-name reveal" data-d="1">Bolívar Fuerte</h2>

      <div class="transform-row reveal" data-d="2">
        <span class="num-old">1.000.000</span>
        <span class="num-arrow">→</span>
        <span class="num-new">1.000</span>
      </div>

      <div class="badge-wrap reveal" data-d="3">
        <span class="ceros-badge">− 3 ceros</span>
      </div>

      <div class="fact-card reveal" data-d="4">
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
