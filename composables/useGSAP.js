// GSAP + ScrollTrigger wrapper.
// Client-side only (Nuxt SSG): callers invoke from <script setup> and we defer
// the real GSAP setup until onMounted + nextTick so template refs are populated.
import { onMounted, onBeforeUnmount, nextTick } from 'vue'

let _gsap = null
let _ScrollTrigger = null
let _loading = null

async function loadGsap () {
  if (_gsap && _ScrollTrigger) return { gsap: _gsap, ScrollTrigger: _ScrollTrigger }
  if (_loading) return _loading
  _loading = (async () => {
    const gsapMod = await import('gsap')
    const stMod = await import('gsap/ScrollTrigger')
    _gsap = gsapMod.default ?? gsapMod.gsap
    _ScrollTrigger = stMod.ScrollTrigger ?? stMod.default
    _gsap.registerPlugin(_ScrollTrigger)

    // Configuración global aplicada una sola vez.
    _ScrollTrigger.config({
      // No re-medir triggers ante cambios de viewport en mobile (típicamente
      // la barra de URL aparece/desaparece) — evita "saltos" en mid-scroll.
      ignoreMobileResize: true
    })
    // Normaliza el scroll para evitar el comportamiento "elástico" de iOS
    // y la rueda errática de algunos trackpads. Mejora notable en macOS.
    _ScrollTrigger.normalizeScroll(true)
    return { gsap: _gsap, ScrollTrigger: _ScrollTrigger }
  })()
  return _loading
}

/**
 * useGSAP(scope, setup)
 * @param {Ref<HTMLElement>|HTMLElement|null} scope - Vue ref or DOM element to scope context to.
 * @param {(gsap, ScrollTrigger, ctx) => void | (() => void)} setup - Setup callback.
 *        Receives gsap, ScrollTrigger and the gsap.context instance. Return value
 *        is treated as an extra cleanup function.
 */
export function useGSAP (scope, setup) {
  if (typeof window === 'undefined') return
  let ctx = null
  let extraCleanup = null

  // CRITICAL: register lifecycle hooks SYNCHRONOUSLY during setup.
  // GSAP itself can finish loading before mount; refs are only populated after mount.
  onMounted(async () => {
    const { gsap, ScrollTrigger } = await loadGsap()
    // One more tick to ensure children + refs in the parent's render tree are bound.
    await nextTick()

    const scopeEl = scope && typeof scope === 'object' && 'value' in scope ? scope.value : scope
    if (!scopeEl) return
    ctx = gsap.context(() => {
      const result = setup(gsap, ScrollTrigger, ctx)
      if (typeof result === 'function') extraCleanup = result
    }, scopeEl)
  })

  onBeforeUnmount(() => {
    if (typeof extraCleanup === 'function') {
      try { extraCleanup() } catch (e) { /* noop */ }
    }
    if (ctx) ctx.revert()
  })
}

export { loadGsap }
