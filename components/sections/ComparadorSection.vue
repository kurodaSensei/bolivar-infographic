<script setup>
import { ref } from 'vue'
import BarChart from '~/components/ui/BarChart.vue'
import countriesData from '~/public/data/countries.json'

const root = ref(null)
const countries = countriesData.countries

useGSAP(root, (gsap, ScrollTrigger) => {
  gsap.from(root.value.querySelectorAll('.reveal'), {
    y: 50, duration: 1.2, stagger: 0.18, ease: 'expo.out',
    immediateRender: false,
    scrollTrigger: { trigger: root.value, start: 'top 80%', toggleActions: 'play none none none' }
  })
})
</script>

<template>
  <section id="comparador" ref="root" class="section-wrap comparador">
    <div class="section-inner">
      <p class="eyebrow reveal">Contexto regional</p>
      <h2 class="comparador-headline reveal">¿Cómo le fue a tu país?</h2>
      <p class="section-body reveal" style="margin-bottom:28px">
        Poder adquisitivo real de $100 USD guardados en 2007. Venezuela siempre visible como referencia.
      </p>
      <div class="reveal">
        <BarChart :countries="countries" default-code="co" />
      </div>
      <p class="comparador-disclaimer reveal">
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
