<script setup>
// Gráfica D3 de la caída del Bs.F: la curva se dibuja siguiendo el progreso de scroll.
// El padre (FallSection) controla el ScrollTrigger; este componente expone
// `setProgress(t)` con t en [0..1] vía defineExpose para que el scrub lo invoque.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as d3 from 'd3'

const root = ref(null)
let pathEl = null
let endDot = null
let totalLength = 0
let ro = null

const W = 800
const H = 160

// Puntos calibrados al SVG del prototipo (mantiene la forma de "colapso").
const PATH_D = 'M0,12 C80,14 140,18 200,25 C280,38 340,55 400,75 C480,100 540,115 600,130 C680,142 740,148 800,152'

function build () {
  if (!root.value) return
  const svg = d3.select(root.value)
  svg.selectAll('*').remove()

  // Gradient & grid
  const defs = svg.append('defs')
  const grad = defs.append('linearGradient')
    .attr('id', 'inflation-area-fill')
    .attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', 1)
  grad.append('stop').attr('offset', 0).attr('stop-color', '#e63946').attr('stop-opacity', 0.25)
  grad.append('stop').attr('offset', 1).attr('stop-color', '#e63946').attr('stop-opacity', 0)

  svg.append('line').attr('x1', 0).attr('y1', 30).attr('x2', W).attr('y2', 30).attr('stroke', '#1e1e32')
  svg.append('line').attr('x1', 0).attr('y1', 80).attr('x2', W).attr('y2', 80).attr('stroke', '#1e1e32')
  svg.append('line').attr('x1', 0).attr('y1', 130).attr('x2', W).attr('y2', 130).attr('stroke', '#1e1e32')

  // Filled area under the curve (closed path)
  const areaD = `${PATH_D} L${W},${H - 2} L0,${H - 2} Z`
  svg.append('path')
    .attr('d', areaD)
    .attr('fill', 'url(#inflation-area-fill)')
    .attr('class', 'inflation-area')

  // Stroke path — scroll-scrubbed
  pathEl = svg.append('path')
    .attr('d', PATH_D)
    .attr('fill', 'none')
    .attr('stroke', '#e63946')
    .attr('stroke-width', 2.5)
    .attr('stroke-linecap', 'round')

  totalLength = pathEl.node().getTotalLength()
  pathEl.attr('stroke-dasharray', totalLength)
       .attr('stroke-dashoffset', totalLength)

  svg.append('circle').attr('cx', 0).attr('cy', 12).attr('r', 5).attr('fill', '#e63946').attr('opacity', 0.7)
  endDot = svg.append('circle').attr('cx', W).attr('cy', 152).attr('r', 5).attr('fill', '#e63946').attr('opacity', 0)

  svg.append('text').attr('x', 4).attr('y', 9)
    .attr('font-family', "'JetBrains Mono', monospace")
    .attr('font-size', 11).attr('fill', '#6b6b88').text('4,3 Bs.F')

  svg.append('text').attr('x', W - 4).attr('y', H - 4)
    .attr('text-anchor', 'end')
    .attr('font-family', "'JetBrains Mono', monospace")
    .attr('font-size', 11).attr('fill', '#e63946').text('248.000 Bs.F')
}

function setProgress (p) {
  if (!pathEl) return
  const t = Math.max(0, Math.min(1, p))
  const offset = totalLength * (1 - t)
  pathEl.attr('stroke-dashoffset', offset)
  if (endDot) endDot.attr('opacity', t > 0.95 ? 1 : 0)
}

onMounted(() => {
  build()
  ro = new ResizeObserver(() => {
    // Path length doesn't change with viewBox-preserveAspectRatio="none",
    // but we re-stamp dasharray in case the path geometry was reset.
    if (pathEl) {
      totalLength = pathEl.node().getTotalLength()
      pathEl.attr('stroke-dasharray', totalLength)
    }
  })
  if (root.value) ro.observe(root.value)
})

onBeforeUnmount(() => {
  if (ro) ro.disconnect()
})

defineExpose({ setProgress })
</script>

<template>
  <div class="chart-wrap">
    <div class="chart-title">Poder adquisitivo del Bolívar Fuerte — 2008 a 2018 (Bs.F por USD)</div>
    <div class="chart-area">
      <svg ref="root" :viewBox="`0 0 ${W} ${H}`" preserveAspectRatio="none" class="chart-svg" />
    </div>
    <div class="chart-x-labels">
      <span>2008</span><span>2010</span><span>2012</span><span>2014</span><span>2016</span><span>2018</span>
    </div>
  </div>
</template>

<style scoped>
.chart-wrap {
  position: relative;
  background: var(--ink-2);
  border: 1px solid var(--wire);
  border-radius: 12px;
  padding: 24px 24px 16px;
  margin-bottom: 20px;
}
.chart-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--dim);
  margin-bottom: 16px;
}
.chart-area {
  position: relative;
  height: 160px;
}
.chart-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}
.chart-x-labels {
  display: flex;
  justify-content: space-between;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--muted);
  margin-top: 8px;
  padding: 0 2px;
}
</style>
