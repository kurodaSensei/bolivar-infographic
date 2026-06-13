<script setup>
// S7 — Calculadora. Sin animaciones de entrada.
import Calculadora from '~/components/ui/Calculadora.vue'
</script>

<template>
  <section id="calc" class="section-wrap calc">
    <div class="section-inner">
      <p class="eyebrow">Herramienta</p>
      <h2 class="calc-headline">¿Cuánto valía tu plata?</h2>
      <p class="section-body" style="margin-bottom:36px">
        Ingresa un monto en bolívares y el año en que lo tenías. Te mostramos qué equivale en las otras eras y en dólares.
      </p>
      <Calculadora />
    </div>
  </section>
</template>

<style scoped>
.calc { background: var(--ink); }
.calc-headline {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: clamp(26px, 4vw, 44px);
  color: var(--bright);
  margin-bottom: 8px;
}
</style>
