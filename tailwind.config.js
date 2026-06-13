/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './app.vue',
    './composables/**/*.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0f',
        'ink-2': '#12121c',
        'ink-3': '#1a1a28',
        'ink-4': '#242438',
        wire: '#2a2a40',
        muted: '#4a4a68',
        dim: '#6b6b88',
        text: '#c8c8e0',
        bright: '#e8e8f0',
        crisis: '#e63946',
        gold: '#f4a261',
        data: '#a8dadc'
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      spacing: {
        xs: '8px',
        s: '16px',
        m: '32px',
        l: '64px',
        xl: '120px'
      }
    }
  },
  plugins: []
}
