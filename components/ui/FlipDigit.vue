<script setup>
// Tarjeta de un dígito en el flip de la Reconversión 3.
// Estados: 'normal' | 'erased' | 'gone' — controlados por el padre.
defineProps({
  value: { type: [String, Number], required: true },
  state: { type: String, default: 'normal' },
  glow: { type: Boolean, default: false }
})
</script>

<template>
  <div class="flip-digit">
    <div class="flip-card" :class="[state, { glow }]">
      <span class="digit">{{ value }}</span>
    </div>
  </div>
</template>

<style scoped>
.flip-digit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}
.flip-card {
  width: clamp(42px, 8vw, 72px);
  height: clamp(52px, 10vw, 90px);
  background: var(--ink-2);
  border: 1px solid var(--wire);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(22px, 5vw, 44px);
  font-weight: 700;
  color: var(--gold);
  position: relative;
  overflow: hidden;
  /* Sólo lo que cambia entre estados — evita conflictos con cualquier
     transform que GSAP pueda aplicar más adelante. */
  transition:
    background 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease;
  transform-origin: 50% 50%;
}
.flip-card.erased,
.flip-card.gone {
  /* Las transiciones de tachado/colapso sí necesitan animar transform. */
  transition:
    background 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease,
    transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1),
    opacity 0.35s ease;
}
.flip-card .digit {
  display: inline-block;
  line-height: 1;
}
.flip-card.erased {
  color: var(--crisis);
  background: var(--crisis-dim);
  border-color: rgba(230, 57, 70, 0.4);
}
.flip-card.erased .digit {
  text-decoration: line-through;
  text-decoration-color: var(--crisis);
  text-decoration-thickness: 2px;
}
.flip-card.gone {
  transform: scaleY(0);
  opacity: 0;
}
.flip-card.glow {
  box-shadow:
    0 0 0 1px rgba(244, 162, 97, 0.4),
    0 0 40px rgba(244, 162, 97, 0.45);
  animation: digit-glow 2.4s ease-in-out infinite;
}
@keyframes digit-glow {
  0%, 100% { box-shadow: 0 0 0 1px rgba(244,162,97,.4), 0 0 30px rgba(244,162,97,.35); }
  50% { box-shadow: 0 0 0 1px rgba(244,162,97,.6), 0 0 60px rgba(244,162,97,.6); }
}
</style>
