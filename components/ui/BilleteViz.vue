<script setup>
// Billete SVG de 1.000.000 Bs — replica fiel del prototipo.
// Envoltura `.banknote-wrap` con perspective; la rotación 3D y el parallax
// los aplica el HeroSection con GSAP scrub.
</script>

<template>
  <div class="banknote-wrap">
    <div class="banknote-3d">
      <svg
        viewBox="0 0 540 256"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Billete venezolano de un millón de bolívares"
      >
        <defs>
          <radialGradient id="paper" cx="36%" cy="38%" r="80%">
            <stop offset="0" stop-color="#c8855e" />
            <stop offset="55%" stop-color="#a0543a" />
            <stop offset="100%" stop-color="#6b2e1e" />
          </radialGradient>
          <linearGradient id="gold-num" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#f8dfa8" />
            <stop offset="100%" stop-color="#b87820" />
          </linearGradient>
          <radialGradient id="vign" cx="50%" cy="50%" r="72%">
            <stop offset="50%" stop-color="#000" stop-opacity="0" />
            <stop offset="100%" stop-color="#1a0805" stop-opacity=".55" />
          </radialGradient>
          <pattern id="hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(44)">
            <line x1="0" y1="0" x2="0" y2="5" stroke="#2e0f08" stroke-width=".5" opacity=".28" />
          </pattern>
          <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="transparent" />
            <stop offset="50%" stop-color="#fff" />
            <stop offset="100%" stop-color="transparent" />
          </linearGradient>
          <clipPath id="card"><rect width="540" height="256" rx="11" /></clipPath>
          <clipPath id="portrait"><ellipse cx="412" cy="128" rx="60" ry="82" /></clipPath>
        </defs>
        <g clip-path="url(#card)">
          <rect width="540" height="256" fill="url(#paper)" />
          <rect width="540" height="256" fill="url(#hatch)" opacity=".38" />
          <g transform="translate(170,138)" stroke="#e8c87a" stroke-width=".42" fill="none" opacity=".38">
            <ellipse rx="90" ry="24" transform="rotate(0)" />
            <ellipse rx="90" ry="24" transform="rotate(12)" />
            <ellipse rx="90" ry="24" transform="rotate(24)" />
            <ellipse rx="90" ry="24" transform="rotate(36)" />
            <ellipse rx="90" ry="24" transform="rotate(48)" />
            <ellipse rx="90" ry="24" transform="rotate(60)" />
            <ellipse rx="90" ry="24" transform="rotate(72)" />
            <ellipse rx="90" ry="24" transform="rotate(84)" />
            <ellipse rx="90" ry="24" transform="rotate(96)" />
            <ellipse rx="90" ry="24" transform="rotate(108)" />
            <ellipse rx="90" ry="24" transform="rotate(120)" />
            <ellipse rx="90" ry="24" transform="rotate(132)" />
            <ellipse rx="90" ry="24" transform="rotate(144)" />
            <ellipse rx="90" ry="24" transform="rotate(156)" />
            <ellipse rx="90" ry="24" transform="rotate(168)" />
            <circle r="95" />
            <circle r="62" />
            <circle r="30" />
          </g>
          <g clip-path="url(#portrait)">
            <rect x="348" y="44" width="128" height="168" fill="#7a2e1a" />
            <g fill="#3a100a" opacity=".82">
              <path d="M360,210C360,165 386,148 412,148C438,148 464,165 464,210Z" />
              <rect x="401" y="112" width="22" height="42" rx="8" />
              <ellipse cx="412" cy="102" rx="24" ry="30" />
              <path d="M386,95C388,72 436,72 438,95C438,80 424,68 412,68C400,68 386,80 386,95Z" />
            </g>
            <g stroke="#e8c47e" stroke-width=".4" opacity=".32">
              <line x1="392" y1="98" x2="432" y2="98" />
              <line x1="390" y1="108" x2="434" y2="108" />
            </g>
          </g>
          <ellipse cx="412" cy="128" rx="60" ry="82" fill="none" stroke="#e8c47e" stroke-width="1.4" opacity=".7" />
          <rect x="8" y="8" width="524" height="240" rx="8" fill="none" stroke="#e8c47e" stroke-width=".9" opacity=".52" />
          <rect x="13" y="13" width="514" height="230" rx="5" fill="none" stroke="#e8c47e" stroke-width=".45" opacity=".3" />
          <g fill="#e8c47e" opacity=".52">
            <polygon points="352,66 354.5,73 362,73 356,77.5 358.5,84.5 352,80 345.5,84.5 348,77.5 342,73 349.5,73" transform="scale(.7) translate(154,27)" />
            <polygon points="352,66 354.5,73 362,73 356,77.5 358.5,84.5 352,80 345.5,84.5 348,77.5 342,73 349.5,73" transform="scale(.7) translate(184,16)" />
            <polygon points="352,66 354.5,73 362,73 356,77.5 358.5,84.5 352,80 345.5,84.5 348,77.5 342,73 349.5,73" transform="scale(.7) translate(214,10)" />
            <polygon points="352,66 354.5,73 362,73 356,77.5 358.5,84.5 352,80 345.5,84.5 348,77.5 342,73 349.5,73" transform="scale(.7) translate(244,7)" />
            <polygon points="352,66 354.5,73 362,73 356,77.5 358.5,84.5 352,80 345.5,84.5 348,77.5 342,73 349.5,73" transform="scale(.7) translate(274,10)" />
          </g>
          <text x="38" y="42" font-family="Georgia, serif" font-size="12" letter-spacing="1.6" fill="#f0d9b0">BANCO CENTRAL DE VENEZUELA</text>
          <text x="38" y="56" font-family="'Courier New', monospace" font-size="7" letter-spacing="1.3" fill="#dfc9a0" opacity=".7">PAGARÁ AL PORTADOR · CARACAS</text>
          <text x="34" y="170" font-family="Georgia, serif" font-weight="700" font-size="55" fill="url(#gold-num)">1.000.000</text>
          <text x="38" y="196" font-family="Georgia, serif" font-style="italic" font-size="16" fill="#f0d9b0">Un millón de bolívares</text>
          <text x="505" y="40" text-anchor="end" font-family="Georgia, serif" font-weight="700" font-size="20" fill="#f0d9b0">Bs</text>
          <text x="505" y="230" text-anchor="end" font-family="Georgia, serif" font-size="14" fill="#f0d9b0" opacity=".8">1.000.000</text>
          <text x="38" y="84" font-family="'Courier New', monospace" font-size="10" letter-spacing="1.3" fill="#bd2b1e">A08 456127</text>
          <text x="38" y="230" font-family="'Courier New', monospace" font-size="7" letter-spacing=".9" fill="#dfc9a0" opacity=".65">CARACAS, 6 DE MARZO DE 2020</text>
          <line x1="300" y1="5" x2="300" y2="251" stroke="#c8a44e" stroke-width="2.5" stroke-dasharray="7 5" opacity=".28" />
          <line x1="185" y1="0" x2="185" y2="256" stroke="#1a0805" stroke-width="1" opacity=".22" />
          <line x1="0" y1="130" x2="540" y2="130" stroke="#1a0805" stroke-width="1" opacity=".18" />
          <rect width="540" height="256" fill="url(#vign)" />
          <rect class="sheen" x="-80" y="0" width="80" height="256" fill="url(#sheen)" opacity=".18">
            <animateTransform attributeName="transform" type="translate" from="-80 0" to="620 0" dur="6s" repeatCount="indefinite" />
          </rect>
        </g>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.banknote-wrap {
  position: relative;
  width: min(520px, 88vw);
  margin: 0 auto;
  perspective: 1400px;
  /* Fallback float — GSAP scrub lo sobrescribe en el Hero. */
  animation: float 8s ease-in-out infinite;
}

.banknote-3d {
  position: relative;
  transform-style: preserve-3d;
  /* Un solo will-change concentrado en el elemento que GSAP transforma —
     el wrap exterior tiene la `animation: float` que ya promueve a layer.
     Demasiado will-change crea capas dobles que repintan el doble. */
  will-change: transform;
}

/* Sombras pesadas (blur 80-90px) en un elemento bajo scrub fuerzan repaints
   de millones de píxeles cada frame. Movemos a una capa que NO se anima
   (debajo del .banknote-3d) y reducimos el blur por escalonamiento. */
.banknote-wrap::after {
  content: '';
  position: absolute;
  inset: -10px;
  border-radius: 16px;
  box-shadow:
    0 0 0 1px rgba(244, 162, 97, 0.18),
    0 30px 60px rgba(0, 0, 0, 0.6),
    0 0 50px rgba(230, 57, 70, 0.12);
  pointer-events: none;
}

svg {
  display: block;
  border-radius: 11px;
  width: 100%;
  height: auto;
}
</style>
