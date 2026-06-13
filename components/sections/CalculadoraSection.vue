<script setup>
// S7 — Calculadora.
import { ref } from 'vue'
import Calculadora from '~/components/ui/Calculadora.vue'

const root = ref(null)
useReveal(root)
</script>

<template>
  <section id="calc" ref="root" class="section-wrap calc">
    <div class="section-inner">
      <p class="eyebrow reveal">Herramienta</p>
      <h2 class="calc-headline reveal" data-d="1">¿Cuánto valía tu plata?</h2>
      <p class="section-body reveal" data-d="2" style="margin-bottom:36px">
        Ingresa un monto en bolívares y el año en que lo tenías. Te mostramos qué equivale en las otras eras y en dólares.
      </p>
      <div class="reveal" data-d="3">
        <Calculadora />
      </div>
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
