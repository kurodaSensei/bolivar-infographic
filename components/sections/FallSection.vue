<script setup>
// S3 — La Caída (2008-2018). La gráfica D3 se dibuja con scroll-scrub,
// no con una animación de duración fija.
import { ref } from 'vue'
import InflationChart from '~/components/ui/InflationChart.vue'

const root = ref(null)
const chart = ref(null)

useGSAP(root, (gsap, ScrollTrigger) => {
  // Reveal stagger — más respirado para dar peso a la cita serif.
  gsap.from(root.value.querySelectorAll('.reveal'), {
    y: 50, duration: 1.3, stagger: 0.2, ease: 'expo.out',
    immediateRender: false,
    scrollTrigger: { trigger: root.value, start: 'top 80%', toggleActions: 'play none none none' }
  })

  // Scroll scrubbing de la curva D3. El trigger es el wrapper del chart
  // (descendiente de root.value, encontrable por gsap.context).
  const chartWrap = root.value.querySelector('.chart-wrap')
  ScrollTrigger.create({
    trigger: chartWrap,
    start: 'top 75%',
    end: 'bottom 35%',
    scrub: 1,
    onUpdate: (self) => {
      if (chart.value?.setProgress) chart.value.setProgress(self.progress)
    }
  })
})
</script>

<template>
  <section id="fall" ref="root" class="section-wrap fall">
    <div class="section-inner">
      <p class="eyebrow reveal">2008 — 2018</p>
      <p class="fall-quote reveal">
        “Y después necesitabas <em>una paca de billetes</em> solo para comprar harina.”
      </p>
      <div class="reveal">
        <InflationChart ref="chart" />
      </div>
      <p class="section-body reveal" style="margin-top:0">
        En 10 años la inflación acumulada superó el 1.000.000%. Una tasa de cambio de 4 bolívares por dólar se convirtió en más de 200.000.
        La misma cantidad de papel, sin el mismo valor.
      </p>
    </div>
  </section>
</template>

<style scoped>
.fall {
  background: radial-gradient(ellipse 60% 50% at 50% 70%, rgba(230, 57, 70, 0.08), transparent 70%), #0c0609;
}
.fall-quote {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: clamp(22px, 3.5vw, 38px);
  line-height: 1.4;
  color: var(--bright);
  max-width: 22ch;
  margin-bottom: 48px;
}
.fall-quote em { color: var(--crisis); font-style: normal; }
</style>
