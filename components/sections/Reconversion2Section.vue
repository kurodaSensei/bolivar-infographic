<script setup>
import { ref } from 'vue'

const root = ref(null)

useGSAP(root, (gsap, ScrollTrigger) => {
  const ctx = root.value
  const tl = gsap.timeline({
    scrollTrigger: { trigger: ctx, start: 'top 70%', toggleActions: 'play none none none' },
    defaults: { ease: 'power2.out' }
  })

  const opt = { immediateRender: false, ease: 'expo.out' }
  tl.from(ctx.querySelector('.reconv-era'), { y: 30, duration: 1.0, ...opt })
    .from(ctx.querySelector('.reconv-name'), { y: 32, duration: 1.2, ...opt }, '-=.7')
    .from(ctx.querySelector('.num-old'), { x: -60, duration: 1.0, ...opt }, '-=.5')
    .from(ctx.querySelector('.num-arrow'), { scale: 0.5, duration: 0.7, ...opt }, '-=.4')
    .from(ctx.querySelector('.num-new'), { scale: 0.4, duration: 1.0, ease: 'back.out(2.2)', ...opt }, '-=.4')
    .from(ctx.querySelector('.ceros-badge'), { y: 20, duration: 0.8, ...opt }, '-=.4')
    .from(ctx.querySelector('.transfer-mock'), { y: 30, duration: 1.1, ...opt }, '-=.3')
})
</script>

<template>
  <section id="r2" ref="root" class="section-wrap r2">
    <div class="section-inner" style="text-align:center">
      <p class="reconv-era">Reconversión · 20 de agosto de 2018</p>
      <h2 class="reconv-name">Bolívar Soberano</h2>

      <div class="transform-row">
        <span class="num-old">1.000</span>
        <span class="num-arrow">→</span>
        <span class="num-new num-new-sm">0,01</span>
      </div>

      <div class="badge-wrap">
        <span class="ceros-badge">− 5 ceros</span>
      </div>

      <div class="transfer-mock">
        <div class="transfer-header">
          <div class="transfer-icon" aria-hidden="true">☕</div>
          <div>
            <div class="transfer-bank">Banco de Venezuela</div>
            <div class="transfer-name">Transferencia enviada</div>
          </div>
        </div>
        <div class="transfer-amount">Bs.S 8.642.000</div>
        <div class="transfer-desc">Pago café en efectivo</div>
        <div class="transfer-divider" />
        <div class="transfer-row"><span>Equivalente USD</span><span class="row-val crisis">$ 1.50</span></div>
        <div class="transfer-row"><span>Fecha</span><span class="row-val">Nov 2018</span></div>
        <div class="transfer-row"><span>Motivo</span><span class="row-val">Un café</span></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.r2 { background: var(--ink); text-align: center; }
.badge-wrap { margin-bottom: 40px; }
.num-new-sm { font-size: clamp(36px, 7vw, 80px); }

.transfer-mock {
  max-width: 340px;
  margin: 0 auto;
  background: var(--ink-3);
  border: 1px solid var(--wire);
  border-radius: 16px;
  padding: 20px;
  text-align: left;
}
.transfer-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}
.transfer-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(230, 57, 70, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}
.transfer-bank { font-size: 13px; color: var(--dim); }
.transfer-name { font-size: 15px; font-weight: 600; color: var(--bright); }
.transfer-amount {
  font-family: 'JetBrains Mono', monospace;
  font-size: 28px;
  font-weight: 700;
  color: var(--crisis);
  margin-bottom: 4px;
}
.transfer-desc { font-size: 13px; color: var(--muted); }
.transfer-divider {
  height: 1px;
  background: var(--wire);
  margin: 14px 0;
}
.transfer-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: var(--dim);
  margin-bottom: 4px;
}
.row-val { color: var(--text); }
.row-val.crisis { color: var(--crisis); }
</style>
