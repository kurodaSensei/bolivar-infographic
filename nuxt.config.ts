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
      title: '14 Ceros — Las reconversiones monetarias de Venezuela',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Tengo un millón de bolívares. ¿Cuándo? La historia de las 3 reconversiones monetarias de Venezuela en 14 órdenes de magnitud.' },
        { name: 'theme-color', content: '#0a0a0f' },
        { name: 'author', content: 'Alfredo Romero' },

        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: '14 Ceros' },
        { property: 'og:title', content: '14 Ceros' },
        { property: 'og:description', content: '¿Cuándo tienes ese millón? Infografía interactiva.' },
        { property: 'og:url', content: 'https://14ceros.vercel.app' },
        { property: 'og:image', content: 'https://14ceros.vercel.app/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Tengo un millón de bolívares. ¿Cuándo? — Las reconversiones monetarias de Venezuela.' },
        { property: 'og:locale', content: 'es_VE' },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: '14 Ceros' },
        { name: 'twitter:description', content: '¿Cuándo tienes ese millón? Infografía interactiva.' },
        { name: 'twitter:image', content: 'https://14ceros.vercel.app/og-image.png' }
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
