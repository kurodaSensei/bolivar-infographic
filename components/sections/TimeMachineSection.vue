<script setup>
// S6 — La Máquina del Tiempo. CountUp animado al entrar en viewport.
import { ref } from 'vue'

const root = ref(null)
const TARGET = 1e14 // 100.000.000.000.000

function format (n) {
  return Math.round(n).toLocaleString('es-VE')
}

// Default al valor final — si GSAP no llega a animar (rAF throttled, prefers-reduced-motion,
// device lento), el número correcto se muestra estático sin quedar atorado en mid-animation.
const display = ref(format(TARGET))

useGSAP(root, (gsap, ScrollTrigger) => {
  gsap.from(root.value.querySelectorAll('.reveal'), {
    y: 50, duration: 1.4, stagger: 0.22, ease: 'expo.out',
    immediateRender: false,
    scrollTrigger: { trigger: root.value, start: 'top 75%', toggleActions: 'play none none none' }
  })

  // Count-up de 0 a 1e14 al entrar en viewport.
  const counter = { v: 0 }
  ScrollTrigger.create({
    trigger: root.value,
    start: 'top 60%',
    once: true,
    onEnter: () => {
      // Reset a 0 justo cuando entra al viewport — si GSAP no progresa luego,
      // el onComplete del .to() o el siguiente repaint del display.value (al
      // último valor escrito por onUpdate) deja el número en su sitio.
      display.value = '0'
      gsap.to(counter, {
        v: 1,
        duration: 3.2,
        ease: 'expo.out',
        onUpdate: () => { display.value = format(TARGET * counter.v) },
        onComplete: () => { display.value = format(TARGET) }
      })
    }
  })
})
</script>

<template>
  <section id="timemachine" ref="root" class="section-wrap timemachine">
    <div class="section-inner" style="text-align:center">
      <p class="eyebrow reveal" style="margin-bottom:24px">La máquina del tiempo</p>
      <div class="reveal">
        <span class="tm-number">{{ display }}</span>
        <span class="tm-unit">bolívares de 2007</span>
      </div>
      <p class="tm-body reveal">
        Con <strong>1 bolívar digital de hoy</strong>, si viajaras al 2007, tendrías 100 billones de bolívares —
        suficiente para comprar más de <strong>45.000 millones de dólares</strong> a la tasa Cadivi de ese año.
      </p>
      <p class="tm-punchline reveal">Solo depende de cuándo los tienes</p>
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
