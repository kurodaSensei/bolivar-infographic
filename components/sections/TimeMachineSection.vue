<script setup>
// S6 — La Máquina del Tiempo. Reveal stagger + count-up dinámico del
// número grande. Diseñado para no romperse:
//   - Default a valor final → si el count-up nunca corre (reduced motion,
//     IO no soportado, JS roto), el número correcto se muestra estático.
//   - requestAnimationFrame directo, no GSAP → sin dependencia del ticker
//     externo que se congelaba en pestañas throttled.
//   - Safety timer → si rAF muere a mitad de animación, snap al valor final.
//   - IntersectionObserver con unobserve() al primer disparo → sin
//     re-triggers cuando el usuario hace scroll de ida y vuelta.
import { ref, onMounted, onBeforeUnmount } from 'vue'

const root = ref(null)
useReveal(root)

const TARGET = 1e14 // 100.000.000.000.000
const FMT = (n) => Math.round(n).toLocaleString('es-VE')

const display = ref(FMT(TARGET))

let observer = null
let rafId = null
let started = false
let safetyTimer = null

function countUp () {
  if (started) return
  started = true
  display.value = '0'

  const duration = 2500
  const startTime = performance.now()

  function tick (now) {
    const elapsed = now - startTime
    const t = Math.min(1, elapsed / duration)
    // Ease-out cubic — arranca con energía y se asienta despacio en el final.
    const eased = 1 - Math.pow(1 - t, 3)
    display.value = FMT(TARGET * eased)
    if (t < 1) {
      rafId = requestAnimationFrame(tick)
    } else {
      display.value = FMT(TARGET) // snap exacto al final
      rafId = null
    }
  }

  rafId = requestAnimationFrame(tick)

  // Red de seguridad: si en el doble de la duración la animación no terminó
  // (rAF severamente throttled / muerto), forzamos el valor final. setTimeout
  // también se throttla en pestañas hidden, pero al menos al volver al foco
  // del usuario el número queda correcto.
  safetyTimer = setTimeout(() => {
    if (display.value !== FMT(TARGET)) {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = null
      display.value = FMT(TARGET)
    }
  }, duration * 2)
}

onMounted(() => {
  if (typeof window === 'undefined') return
  // Reduced motion: sin animación, el número final ya está visible.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (typeof IntersectionObserver === 'undefined') return // valor final ya visible

  const numWrap = root.value?.querySelector('.tm-number-wrap')
  if (!numWrap) return

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !started) {
        observer.unobserve(entry.target)
        countUp()
      }
    })
  }, {
    // 25% del wrapper visible — un poco más tarde que el .reveal (18%) para
    // que la fade-in del wrapper ya esté arrancada cuando el count-up empieza.
    threshold: 0.25,
    rootMargin: '0px 0px -8% 0px'
  })

  observer.observe(numWrap)
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
  if (rafId) cancelAnimationFrame(rafId)
  if (safetyTimer) clearTimeout(safetyTimer)
})
</script>

<template>
  <section id="timemachine" ref="root" class="section-wrap timemachine">
    <div class="section-inner" style="text-align:center">
      <p class="eyebrow reveal" style="margin-bottom:24px">La máquina del tiempo</p>
      <div class="reveal tm-number-wrap" data-d="1">
        <span class="tm-number">{{ display }}</span>
        <span class="tm-unit">bolívares de 2007</span>
      </div>
      <p class="tm-body reveal" data-d="2">
        Con <strong>1 bolívar digital de hoy</strong>, si viajaras al 2007, tendrías 100 billones de bolívares —
        suficiente para comprar más de <strong>45.000 millones de dólares</strong> a la tasa Cadivi de ese año.
      </p>
      <p class="tm-punchline reveal" data-d="3">Solo depende de cuándo los tienes</p>
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
  /* font-variant-numeric tabular evita el "salto" de ancho al cambiar dígitos */
  font-variant-numeric: tabular-nums;
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
