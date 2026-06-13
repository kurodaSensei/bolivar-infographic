<script setup>
// S8 — Comparador regional.
import { ref } from 'vue'
import BarChart from '~/components/ui/BarChart.vue'
import countriesData from '~/public/data/countries.json'

const root = ref(null)
useReveal(root)

const countries = countriesData.countries
</script>

<template>
  <section id="comparador" ref="root" class="section-wrap comparador">
    <div class="section-inner">
      <p class="eyebrow reveal">Contexto regional</p>
      <h2 class="comparador-headline reveal" data-d="1">¿Cómo le fue a tu país?</h2>
      <p class="section-body reveal" data-d="2" style="margin-bottom:28px">
        Poder adquisitivo real de $100 USD guardados en 2007. Venezuela siempre visible como referencia.
      </p>
      <div class="reveal" data-d="3">
        <BarChart :countries="countries" default-code="co" />
      </div>
      <p class="comparador-disclaimer reveal" data-d="4">
        Datos basados en inflación acumulada 2007–2024. Fuente: FMI World Economic Outlook, BCV, CEPAL.
        Venezuela excluida de escala lineal por diferencia de 14 órdenes de magnitud.
      </p>
    </div>
  </section>
</template>

<style scoped>
.comparador { background: var(--ink-2); }
.comparador-headline {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: clamp(24px, 3.8vw, 42px);
  color: var(--bright);
  margin-bottom: 8px;
}
.comparador-disclaimer {
  font-size: 13px;
  color: var(--muted);
  margin-top: 32px;
  line-height: 1.6;
  font-style: italic;
}
</style>
