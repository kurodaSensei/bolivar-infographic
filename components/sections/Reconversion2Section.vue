<script setup>
// S4 — Reconversión 2. Reveal stagger via IntersectionObserver.
import { ref } from 'vue'

const root = ref(null)
useReveal(root)
</script>

<template>
  <section id="r2" ref="root" class="section-wrap r2">
    <div class="section-inner" style="text-align:center">
      <p class="reconv-era reveal">Reconversión · 20 de agosto de 2018</p>
      <h2 class="reconv-name reveal" data-d="1">Bolívar Soberano</h2>

      <div class="transform-row reveal" data-d="2">
        <span class="num-old">1.000</span>
        <span class="num-arrow">→</span>
        <span class="num-new num-new-sm">0,01</span>
      </div>

      <div class="badge-wrap reveal" data-d="3">
        <span class="ceros-badge">− 5 ceros</span>
      </div>

      <div class="transfer-mock reveal" data-d="4">
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
