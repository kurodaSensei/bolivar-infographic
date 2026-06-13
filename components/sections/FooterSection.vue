<script setup>
// Footer — atribución informativa, monograma AR y enlaces.
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <a
        class="logo-link"
        href="https://alfredoromero.dev"
        target="_blank"
        rel="noopener"
        aria-label="Portafolio de Alfredo Romero"
      >
        <svg class="ar-logo" viewBox="0 0 32 32" aria-hidden="true">
          <text
            x="50%" y="78%"
            text-anchor="middle"
            font-family="'Playfair Display', Georgia, serif"
            font-size="26" font-weight="500"
          >
            <tspan class="ar-a">A</tspan><tspan class="ar-r" font-style="italic">R</tspan>
          </text>
        </svg>
        <span class="logo-mark-text">Alfredo Romero</span>
      </a>

      <div class="footer-body">
        <p class="footer-lead">
          Hecho de manera informativa por <strong>Alfredo Romero</strong>,
          recopilando datos públicos sobre las reconversiones monetarias de Venezuela.
        </p>
        <p class="footer-meta">
          Esta pieza no es asesoría financiera ni un análisis editorial — sólo presenta
          los números oficiales en su contexto histórico. Fuentes: BCV, CEPAL, FMI, DolarToday,
          y las Gacetas Oficiales N° 38.638 (2008), 41.446 (2018) y 42.185 (2021).
        </p>
      </div>

      <nav class="footer-links" aria-label="Enlaces de Alfredo Romero">
        <a class="footer-link" href="https://alfredoromero.dev" target="_blank" rel="noopener">
          <span class="link-label">Portafolio</span>
          <span class="link-url">alfredoromero.dev</span>
        </a>
        <a class="footer-link" href="https://linkedin.com/in/alfredoromero-m" target="_blank" rel="noopener">
          <span class="link-label">LinkedIn</span>
          <span class="link-url">alfredoromero-m</span>
        </a>
        <a class="footer-link" href="mailto:alfredorm2353@gmail.com">
          <span class="link-label">Email</span>
          <span class="link-url">alfredorm2353@gmail.com</span>
        </a>
      </nav>
    </div>

    <div class="footer-baseline">
      <span>© {{ year }} · Alfredo Romero</span>
      <span class="dot" aria-hidden="true">·</span>
      <span>Construido con Nuxt 3, GSAP y D3</span>
      <span class="dot" aria-hidden="true">·</span>
      <span>Bogotá, Colombia</span>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--ink);
  border-top: 1px solid var(--wire);
  padding: clamp(56px, 8vw, 96px) clamp(20px, 5vw, 80px) 32px;
  color: var(--dim);
}

.footer-inner {
  max-width: 1080px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: clamp(28px, 5vw, 64px);
  align-items: start;
}

/* — Logo column — */
.logo-link {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  text-decoration: none;
  color: var(--dim);
  transition: color 0.25s ease;
}
.logo-link:hover { color: var(--bright); }

.ar-logo {
  width: 52px;
  height: 52px;
  display: block;
}
.ar-logo .ar-a { fill: var(--bright); }
.ar-logo .ar-r { fill: var(--gold); }

.logo-mark-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--muted);
}

/* — Body column — */
.footer-body { max-width: 52ch; }
.footer-lead {
  font-family: 'Playfair Display', serif;
  font-size: clamp(15px, 1.6vw, 18px);
  line-height: 1.55;
  color: var(--text);
  margin-bottom: 14px;
}
.footer-lead strong { color: var(--gold); font-weight: 600; }
.footer-meta {
  font-size: 13px;
  line-height: 1.65;
  color: var(--muted);
}

/* — Links column — */
.footer-links {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 200px;
}
.footer-link {
  display: flex;
  flex-direction: column;
  gap: 2px;
  text-decoration: none;
  border-left: 2px solid var(--wire);
  padding: 4px 0 4px 14px;
  transition: border-color 0.25s ease;
}
.footer-link:hover { border-left-color: var(--gold); }
.link-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--muted);
}
.footer-link:hover .link-label { color: var(--gold); }
.link-url {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: var(--text);
}
.footer-link:hover .link-url { color: var(--bright); }

/* — Baseline — */
.footer-baseline {
  max-width: 1080px;
  margin: 56px auto 0;
  padding-top: 24px;
  border-top: 1px solid var(--wire);
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--muted);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 12px;
}
.footer-baseline .dot { color: var(--wire); }

/* — Mobile — */
@media (max-width: 760px) {
  .footer-inner {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .footer-baseline { justify-content: flex-start; }
}
</style>
