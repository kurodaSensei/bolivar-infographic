// Reactive scroll progress (0..1). Uses rAF throttle and respects SSR.
import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useScrollProgress () {
  const progress = ref(0)
  let ticking = false

  function update () {
    const h = document.documentElement.scrollHeight - window.innerHeight
    progress.value = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0
    ticking = false
  }

  function onScroll () {
    if (!ticking) {
      ticking = true
      requestAnimationFrame(update)
    }
  }

  onMounted(() => {
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update, { passive: true })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', update)
  })

  return { progress }
}
