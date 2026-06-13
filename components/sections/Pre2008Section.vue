<script setup>
import { ref } from 'vue'

const root = ref(null)

useGSAP(root, (gsap, ScrollTrigger) => {
  gsap.from(root.value.querySelectorAll('.reveal'), {
    y: 50,
    duration: 1.3,
    ease: 'expo.out',
    stagger: 0.18,
    immediateRender: false,
    scrollTrigger: { trigger: root.value, start: 'top 80%', toggleActions: 'play none none none' }
  })
})
</script>

<template>
  <section id="pre2008" ref="root" class="section-wrap pre2008">
    <div class="section-inner">
      <p class="eyebrow reveal">Punto de partida · antes de 2008</p>
      <h2 class="reveal pre-headline">El bolívar original todavía valía algo.</h2>
      <p class="section-body reveal">
        A mediados de los 2000 la inflación ya corría, pero el bolívar de siempre aún se contaba en miles.
        Existía la tasa de cambio controlada del gobierno — el Cadivi — que mantenía artificialmente la ilusión de estabilidad.
      </p>
      <div class="rate-badge reveal">
        <div class="rate-cell">
          <div class="rate-label">Tasa Cadivi</div>
          <div class="rate-val">2.150 <span class="rate-suffix">Bs</span></div>
        </div>
        <div class="rate-cell">
          <div class="rate-label">Por</div>
          <div class="rate-val">1 <span class="rate-suffix">USD</span></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pre2008 { background: var(--ink); }

.pre-headline {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: clamp(28px, 4vw, 48px);
  line-height: 1.1;
  color: var(--bright);
  max-width: 18ch;
  margin-bottom: 16px;
}

.rate-badge {
  display: inline-flex;
  align-items: center;
  gap: 0;
  border: 1px solid var(--wire);
  border-radius: 12px;
  overflow: hidden;
  margin-top: 32px;
}
.rate-cell {
  padding: 20px 28px;
  font-family: 'JetBrains Mono', monospace;
}
.rate-cell:first-child {
  background: var(--ink-2);
  border-right: 1px solid var(--wire);
}
.rate-cell:first-child .rate-val { color: var(--gold); }
.rate-cell:last-child .rate-val { color: var(--bright); }
.rate-label {
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--dim);
  margin-bottom: 6px;
}
.rate-val {
  font-size: clamp(26px, 4vw, 38px);
  font-weight: 700;
}
.rate-suffix {
  font-size: 0.5em;
  color: var(--muted);
  margin-left: 4px;
}
</style>
