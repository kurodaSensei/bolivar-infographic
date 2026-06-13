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
        { name: 'description', content: 'Infografía interactiva sobre las tres reconversiones monetarias de Venezuela (2008, 2018, 2021).' },
        { name: 'theme-color', content: '#0a0a0f' }
      ],
      link: [
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
