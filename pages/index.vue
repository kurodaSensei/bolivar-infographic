<script setup>
// SPA única — todas las secciones en orden narrativo estricto.
// Las secciones se auto-importan desde components/sections/.
// Usamos los prefijos Lazy* para code-splitting por sección.
const sections = [
  { id: 'hero',        title: 'Inicio' },
  { id: 'pre2008',     title: '2007' },
  { id: 'r1',          title: '2008' },
  { id: 'fall',        title: 'La Caída' },
  { id: 'r2',          title: '2018' },
  { id: 'r3',          title: '2021' },
  { id: 'timemachine', title: 'Máquina del Tiempo' },
  { id: 'calc',        title: 'Calculadora' },
  { id: 'comparador',  title: 'Comparador' },
  { id: 'cierre',      title: 'Cierre' }
]
</script>

<template>
  <div>
    <div class="grain" aria-hidden="true" />
    <ScrollProgress />
    <NavDots :sections="sections" />

    <main>
      <HeroSection />
      <LazyPre2008Section />
      <LazyReconversion1Section />
      <LazyFallSection />
      <LazyReconversion2Section />
      <LazyReconversion3Section />
      <LazyTimeMachineSection />
      <LazyCalculadoraSection />
      <LazyComparadorSection />
      <LazyCierreSection />
    </main>

    <LazyFooterSection />
  </div>
</template>
