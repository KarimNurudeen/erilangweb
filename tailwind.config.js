export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        ink: '#182534',
        surface: '#101216',
        raised: '#171a20',
        line: '#23272f',
        muted: '#98a0ad',
        accent: {
          DEFAULT: '#ADDFF1',
          soft: '#D9F1FA',
          deep: '#2B7A99',
        },
        code: {
          key: '#2ee6a8',
          str: '#ffc978',
          num: '#9db6ff',
          com: '#6b7280',
          fn: '#e6e9ef',
          type: '#7fd7ff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        page: '1240px',
      },
      transitionTimingFunction: {
        eri: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
  plugins: [],
}
