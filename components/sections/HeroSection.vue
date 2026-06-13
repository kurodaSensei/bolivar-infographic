<script setup>
// S0 — Hero. Parallax + rotación 3D del billete atados a scroll,
// reveal escalonado de los textos en intro.
import { ref } from 'vue'
import BilleteViz from '~/components/ui/BilleteViz.vue'

const root = ref(null)

useGSAP(root, (gsap, ScrollTrigger) => {
  // Intro reveal eliminada — el texto y el billete están visibles desde el
  // primer paint. Solo conservamos el efecto de scroll del billete (parallax
  // + rotación 3D) que es parte del storytelling, no un reveal.

  // Una sola timeline atada al scroll para todo el efecto del billete:
  // parallax + rotación 3D + fade-out. Un solo ScrollTrigger = un cálculo
  // por frame; scrub uniforme = sin desincronización entre transforms.
  // IMPORTANTE: usamos root.value (no '#hero') como trigger porque dentro
  // de gsap.context(scope=root.value), querySelector('#hero') no encuentra
  // al propio scope (sólo busca descendientes).
  const heroScrub = gsap.timeline({
    scrollTrigger: {
      trigger: root.value,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.6,
      invalidateOnRefresh: true
    },
    defaults: { ease: 'none' }
  })
  heroScrub
    .to('.banknote-wrap-outer', { y: -180, opacity: 0 }, 0)
    .fromTo('.banknote-3d',
      { rotateY: -1, rotateX: 2, scale: 1 },
      { rotateY: 14, rotateX: -6, scale: 0.94 },
      0
    )
})
</script>

<template>
  <section id="hero" ref="root" class="section-wrap hero">
    <div class="banknote-wrap-outer">
      <BilleteViz />
    </div>

    <div class="section-inner hero-text">
      <p class="hero-kicker">Venezuela · 2007 — 2021 · Reconversiones Monetarias</p>
      <h1 class="hero-h1">Tengo un millón de bolívares.</h1>
      <span class="hero-cuando">¿Cuándo?</span>
      <p class="hero-sub">La misma cifra. El mismo país. Catorce órdenes de magnitud de diferencia — según el año en que la tengas en la mano.</p>
    </div>

    <div class="scroll-cue" aria-hidden="true">
      <span>Desplaza</span>
      <svg class="scroll-arrow" viewBox="0 0 18 26" fill="none">
        <path d="M9 1v22M2 16l7 7 7-7" stroke="#4a4a68" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
  </section>
</template>

<style scoped>
.hero {
  justify-content: center;
  align-items: center;
  text-align: center;
  background: radial-gradient(ellipse 90% 70% at 50% 30%, rgba(230, 57, 70, 0.07) 0, transparent 70%), var(--ink);
}
.banknote-wrap-outer {
  margin-bottom: 48px;
  will-change: transform, opacity;
}

.hero-text { text-align: center; }

/* Intro escalonada CSS — animation-delay coordina la cadencia. forwards
   mantiene el estado final si el usuario navega y vuelve. */
.hero-kicker,
.hero-h1,
.hero-cuando,
.hero-sub,
.scroll-cue {
  opacity: 0;
  animation: hero-fade-up 0.9s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
}
.hero-kicker  { animation-delay: 0.20s; }
.hero-h1      { animation-delay: 0.40s; }
.hero-cuando  { animation-delay: 0.65s; }
.hero-sub     { animation-delay: 0.95s; }
.scroll-cue   { animation-delay: 1.30s; }

.hero-kicker {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 32px;
}
.hero-h1 {
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 700;
  font-size: clamp(38px, 7vw, 80px);
  line-height: 1.05;
  color: var(--bright);
  max-width: 14ch;
  margin: 0 auto 20px;
  letter-spacing: -0.02em;
}
.hero-cuando {
  font-family: 'Playfair Display', Georgia, serif;
  font-style: italic;
  font-weight: 700;
  font-size: clamp(52px, 11vw, 128px);
  line-height: 1;
  color: var(--crisis);
  text-shadow: 0 0 60px var(--crisis-glow);
  display: block;
  margin-bottom: 28px;
  /* Doble animación: intro one-shot + pulse continuo. Coexisten porque animan
     propiedades distintas (opacity/transform vs text-shadow). */
  animation:
    hero-fade-up 0.9s cubic-bezier(0.22, 0.61, 0.36, 1) 0.65s forwards,
    crisis-pulse 4s ease-in-out infinite;
}
.hero-sub {
  max-width: 42ch;
  margin: 0 auto 56px;
  color: var(--dim);
  font-size: 17px;
  line-height: 1.65;
}

.scroll-cue {
  position: absolute;
  bottom: 36px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.scroll-cue span {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--muted);
}
.scroll-arrow {
  width: 18px;
  height: 26px;
  animation: bob 1.8s ease-in-out infinite;
}
</style>
