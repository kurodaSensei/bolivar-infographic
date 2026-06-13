<script setup>
// S5 — CLÍMAX. FlipDigit con GSAP, reseteable.
import { ref, reactive } from 'vue'
import FlipDigit from '~/components/ui/FlipDigit.vue'

const root = ref(null)

// digits[0] es '1' (millón), 1..6 son los ceros eliminados.
// (Visualmente: 1 . 000 . 000 — 1 + 6 ceros.)
const digits = reactive([
  { value: '1', state: 'normal' },
  { value: '0', state: 'normal' },
  { value: '0', state: 'normal' },
  { value: '0', state: 'normal' },
  { value: '0', state: 'normal' },
  { value: '0', state: 'normal' },
  { value: '0', state: 'normal' }
])

const running = ref(false)
const done = ref(false)
let timers = []

function clearTimers () {
  timers.forEach((t) => clearTimeout(t))
  timers = []
}

function reset () {
  clearTimers()
  digits.forEach((d) => { d.state = 'normal' })
  running.value = false
  done.value = false
}

function runFlip () {
  if (running.value) return
  reset()
  running.value = true

  // Borra del dígito 6 al 1, dejando el "1" (índice 0) intacto.
  const order = [6, 5, 4, 3, 2, 1]
  order.forEach((idx, i) => {
    timers.push(setTimeout(() => {
      digits[idx].state = 'erased'
      timers.push(setTimeout(() => {
        digits[idx].state = 'gone'
        if (i === order.length - 1) {
          timers.push(setTimeout(() => {
            running.value = false
            done.value = true
          }, 600))
        }
      }, 280))
    }, i * 280))
  })
}

useGSAP(root, (gsap, ScrollTrigger) => {
  // Reveal del wrap — generoso para que el lector tenga tiempo de leer el
  // climax-note serif antes de que el flip arranque.
  gsap.from(root.value.querySelectorAll('.reveal'), {
    y: 50, duration: 1.3, stagger: 0.18, ease: 'expo.out',
    immediateRender: false,
    scrollTrigger: { trigger: root.value, start: 'top 70%', toggleActions: 'play none none none' }
  })

  // Dispara la animación al entrar al viewport — el millón a 1 ocurre
  // automáticamente la primera vez que la sección llega al 60% del viewport.
  // IMPORTANTE: trigger=root.value (no '#r3') porque gsap.context scope=root.value
  // y querySelector('#r3') no encuentra al propio scope.
  ScrollTrigger.create({
    trigger: root.value,
    start: 'top 65%',
    once: true,
    onEnter: () => setTimeout(runFlip, 500)
  })
})
</script>

<template>
  <section id="r3" ref="root" class="section-wrap r3">
    <div class="section-inner" style="text-align:center">
      <p class="reconv-era reveal">Reconversión · 1 de octubre de 2021</p>
      <h2 class="reconv-name reveal">Bolívar Digital</h2>
      <p class="climax-note reveal">
        El billete de mayor denominación en la historia — 7 meses después de imprimirse, representaba exactamente esto:
      </p>

      <div class="flip-container reveal" aria-live="polite">
        <FlipDigit :value="digits[0].value" :state="digits[0].state" :glow="done" />
        <span class="flip-sep">.</span>
        <FlipDigit :value="digits[1].value" :state="digits[1].state" />
        <FlipDigit :value="digits[2].value" :state="digits[2].state" />
        <FlipDigit :value="digits[3].value" :state="digits[3].state" />
        <span class="flip-sep">.</span>
        <FlipDigit :value="digits[4].value" :state="digits[4].state" />
        <FlipDigit :value="digits[5].value" :state="digits[5].state" />
        <FlipDigit :value="digits[6].value" :state="digits[6].state" />
      </div>

      <button
        class="flip-btn reveal"
        :disabled="running"
        @click="done ? reset() : runFlip()"
      >
        {{ done ? 'REINICIAR' : (running ? 'BORRANDO…' : 'VER LA RECONVERSIÓN →') }}
      </button>

      <p class="climax-stat reveal">
        <strong>− 6 ceros.</strong> Un millón de bolívares soberanos se convirtió en 1 bolívar digital. El billete con el que comenzamos esta historia valía exactamente 1 Bs.D.
      </p>
    </div>
  </section>
</template>

<style scoped>
.r3 {
  background: radial-gradient(ellipse 80% 60% at 50% 50%, rgba(230, 57, 70, 0.06), transparent 65%), var(--ink);
  text-align: center;
}
.climax-note {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: clamp(15px, 2vw, 19px);
  color: var(--dim);
  max-width: 44ch;
  margin: 0 auto 48px;
  line-height: 1.7;
}
.flip-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(8px, 2vw, 16px);
  flex-wrap: wrap;
  margin-bottom: 32px;
}
.flip-sep {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(20px, 4vw, 36px);
  font-weight: 700;
  color: var(--muted);
  align-self: center;
  padding-top: clamp(0px, 1vw, 8px);
}
.flip-btn {
  margin-bottom: 40px;
  margin-top: 28px;
  background: transparent;
  border: 1px solid var(--wire);
  border-radius: 999px;
  color: var(--dim);
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.18em;
  padding: 10px 24px;
  cursor: pointer;
  transition: all 0.2s;
}
.flip-btn:hover:not(:disabled) {
  color: var(--gold);
  border-color: var(--gold);
}
.flip-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.climax-stat {
  font-family: 'Playfair Display', serif;
  font-size: clamp(16px, 2.2vw, 21px);
  color: var(--dim);
  line-height: 1.65;
  max-width: 38ch;
  margin: 0 auto 16px;
}
.climax-stat strong { color: var(--crisis); }
</style>
