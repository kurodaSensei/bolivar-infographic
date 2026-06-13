<script setup>
import { ref } from 'vue'

const root = ref(null)

useGSAP(root, (gsap, ScrollTrigger) => {
  // Cierre — el más respirado de todos: queremos que "14" aterrice solo,
  // luego label, luego statement, luego fuentes.
  gsap.from(root.value.querySelectorAll('.reveal'), {
    y: 50, duration: 1.5, stagger: 0.28, ease: 'expo.out',
    immediateRender: false,
    scrollTrigger: { trigger: root.value, start: 'top 75%', toggleActions: 'play none none none' }
  })
})
</script>

<template>
  <section id="cierre" ref="root" class="section-wrap cierre">
    <div class="section-inner" style="text-align:center">
      <p class="eyebrow reveal" style="margin-bottom:32px">En total</p>
      <span class="cierre-number reveal">14</span>
      <span class="cierre-label reveal">órdenes de magnitud · en 13 años</span>
      <p class="cierre-statement reveal">
        Tres reconversiones. Catorce ceros borrados del mapa. Los números hablan solos.
      </p>
      <div class="sources reveal">
        <strong>Fuentes:</strong>
        Banco Central de Venezuela (BCV) · CEPAL · FMI World Economic Outlook ·
        DolarToday (series históricas) · Gacetas Oficiales de Venezuela
        N° 38.638 (2008), N° 41.446 (2018), N° 42.185 (2021)
      </div>
    </div>
  </section>
</template>

<style scoped>
.cierre {
  background: var(--ink);
  text-align: center;
  min-height: 60vh;
}
.cierre-number {
  font-family: 'Playfair Display', serif;
  font-weight: 900;
  font-size: clamp(60px, 14vw, 160px);
  line-height: 0.9;
  color: var(--wire);
  letter-spacing: -0.04em;
  margin-bottom: 24px;
  display: block;
}
.cierre-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(12px, 1.8vw, 16px);
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--muted);
  display: block;
  margin-bottom: 40px;
}
.cierre-statement {
  font-family: 'Playfair Display', serif;
  font-size: clamp(20px, 3vw, 32px);
  line-height: 1.45;
  color: var(--text);
  max-width: 32ch;
  margin: 0 auto 48px;
}
.sources {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--muted);
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.8;
}
.sources strong { color: var(--dim); }
</style>
