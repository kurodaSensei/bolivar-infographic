export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  ssr: true,
  devtools: { enabled: false },
  // vercel-static genera el output en formato Vercel Build Output API
  // (.vercel/output/static/) que Vercel lee nativamente sin configuración extra.
  // Para previews locales seguimos usando `npm run preview` o `npx serve .output/public`.
  nitro: { preset: 'vercel-static' },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss'],
  components: [
    { path: '~/components', pathPrefix: false }
  ],
  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      title: '¿Cuándo tienes ese millón? — Venezuela y sus reconversiones',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Infografía interactiva sobre las tres reconversiones monetarias de Venezuela (2008, 2018, 2021). 14 órdenes de magnitud en 13 años.' },
        { name: 'theme-color', content: '#0a0a0f' },
        { name: 'author', content: 'Alfredo Romero' },

        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: '¿Cuándo tienes ese millón? — Venezuela y sus reconversiones' },
        { property: 'og:description', content: 'La misma cifra. El mismo país. 14 órdenes de magnitud de diferencia — según el año en que la tengas en la mano.' },
        { property: 'og:image', content: '/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Tengo un millón de bolívares. ¿Cuándo? — Infografía sobre las reconversiones monetarias de Venezuela.' },
        { property: 'og:locale', content: 'es_VE' },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: '¿Cuándo tienes ese millón?' },
        { name: 'twitter:description', content: 'Las tres reconversiones monetarias de Venezuela, contadas con scroll storytelling y data viz.' },
        { name: 'twitter:image', content: '/og-image.png' }
      ],
      link: [
        // Favicons — SVG para navegadores modernos, ICO para legacy.
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },

        // Fonts
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;700&display=swap'
        }
      ]
    }
  }
})
