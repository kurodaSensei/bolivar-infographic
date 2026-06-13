<script setup>
import { ref } from 'vue'

const root = ref(null)

useGSAP(root, (gsap, ScrollTrigger) => {
  const ctx = root.value
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ctx,
      start: 'top 70%',
      toggleActions: 'play none none none'
    },
    defaults: { ease: 'power2.out' }
  })

  // Easing por defecto exponencial; el num-new mantiene back.out porque el
  // "pop" del número grande es parte de la dramaturgia de la sección.
  const opt = { immediateRender: false, ease: 'expo.out' }
  tl.from(ctx.querySelector('.reconv-era'), { y: 30, duration: 1.0, ...opt })
    .from(ctx.querySelector('.reconv-name'), { y: 32, duration: 1.2, ...opt }, '-=.7')
    .from(ctx.querySelector('.num-old'), { x: -60, duration: 1.0, ...opt }, '-=.5')
    .from(ctx.querySelector('.num-arrow'), { scale: 0.5, duration: 0.7, ...opt }, '-=.4')
    .from(ctx.querySelector('.num-new'), { scale: 0.4, duration: 1.0, ease: 'back.out(2.2)', ...opt }, '-=.4')
    .from(ctx.querySelector('.ceros-badge'), { y: 20, duration: 0.8, ...opt }, '-=.4')
    .from(ctx.querySelector('.fact-card'), { y: 30, duration: 1.1, ...opt }, '-=.3')
})
</script>

<template>
  <section id="r1" ref="root" class="section-wrap r1">
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
