<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  sections: {
    type: Array,
    required: true
  }
})

const activeIndex = ref(0)
let observer = null

function scrollTo (i) {
  const el = document.getElementById(props.sections[i].id)
  if (!el) return
  // Sin scroll-behavior:smooth global, hacemos el comportamiento explícito
  // sólo para clicks de navegación.
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const i = props.sections.findIndex((s) => s.id === e.target.id)
        if (i >= 0) activeIndex.value = i
      }
    })
  }, { threshold: 0.4 })

  props.sections.forEach((s) => {
    const el = document.getElementById(s.id)
    if (el) observer.observe(el)
  })
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <nav class="nav-pill" aria-label="Navegación por secciones">
    <button
      v-for="(s, i) in sections"
      :key="s.id"
      class="nav-dot"
      :class="{ active: activeIndex === i }"
      :title="s.title"
      :aria-label="s.title"
      :aria-current="activeIndex === i ? 'true' : 'false'"
      @click="scrollTo(i)"
    />
  </nav>
</template>

<style scoped>
.nav-pill {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9000;
  display: flex;
  gap: 2px;
  background: rgba(10, 10, 15, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--wire);
  border-radius: 999px;
  padding: 4px;
}
.nav-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--muted);
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;
  border: none;
  padding: 0;
  margin: 4px;
}
.nav-dot:hover { background: var(--dim); }
.nav-dot.active {
  background: var(--gold);
  transform: scale(1.3);
}
</style>
