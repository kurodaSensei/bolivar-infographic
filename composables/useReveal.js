// IntersectionObserver-based reveal. Cada elemento con clase .reveal dentro del
// scope se observa una sola vez — al entrar al viewport recibe .in y se deja
// de observar. No hay timelines GSAP, no hay setTimeout, no hay state machine
// que se pueda romper con HMR / lazy components / pestañas throttled:
//   - El IO callback corre incluso en pestañas hidden (las CSS transitions las
//     resuelve el compositor cuando la pestaña vuelve a ser visible)
//   - unobserve() evita re-triggers cuando el usuario hace scroll de ida y vuelta
//   - Si IO no está disponible, mostramos los elementos directamente (no se
//     quedan invisibles para siempre)
import { onMounted, onBeforeUnmount } from 'vue'

export function useReveal (scopeRef, options = {}) {
  if (typeof window === 'undefined') return

  let observer = null

  onMounted(() => {
    const scope = (scopeRef && 'value' in scopeRef) ? scopeRef.value : scopeRef
    if (!scope) return

    const targets = scope.querySelectorAll('.reveal')
    if (!targets.length) return

    // Fallback: si el navegador no soporta IO (raro hoy), mostrar todo
    // inmediatamente para que el contenido nunca quede oculto por bug del browser.
    if (typeof IntersectionObserver === 'undefined') {
      targets.forEach((t) => t.classList.add('in'))
      return
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in')
          observer.unobserve(entry.target)
        }
      })
    }, {
      threshold: options.threshold ?? 0.18,
      // -8% inferior para que dispare apenas el elemento "respira" en viewport,
      // no en el instante exacto en que el borde superior cruza el borde inferior.
      rootMargin: options.rootMargin ?? '0px 0px -8% 0px'
    })

    targets.forEach((t) => observer.observe(t))
  })

  onBeforeUnmount(() => {
    if (observer) observer.disconnect()
  })
}
