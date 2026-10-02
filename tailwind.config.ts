import type { Config } from 'tailwindcss'

/**
 * 全站配色与字体在此统一配置。
 * - navy：深海军蓝 / 石墨黑系，企业主色
 * - accent：电光蓝，科技强调色
 * - energy：新能源绿，可持续强调色
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F2F6FB',
          100: '#E2EAF4',
          200: '#C3D2E5',
          300: '#94AAC8',
          400: '#5D7BA3',
          500: '#3A567E',
          600: '#28405F',
          700: '#1B2E48',
          800: '#122036',
          900: '#0B1628',
          950: '#060D1A',
        },
        graphite: '#11161D',
        accent: {
          DEFAULT: '#2E9BFF',
          soft: '#7CC4FF',
          dim: '#1B6FC4',
        },
        energy: {
          DEFAULT: '#34D08C',
          soft: '#8AE6BD',
          dim: '#1E8F5A',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'PingFang SC',
          'Hiragino Sans GB',
          'Microsoft YaHei',
          'Noto Sans SC',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      letterSpacing: {
        widest2: '0.35em',
      },
      maxWidth: {
        content: '1200px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scroll-hint': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '70%': { transform: 'translateY(14px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '0' },
        },
        'dash-flow': {
          to: { strokeDashoffset: '-120' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'scroll-hint': 'scroll-hint 2.2s ease-in-out infinite',
        'dash-flow': 'dash-flow 6s linear infinite',
        'pulse-soft': 'pulse-soft 3.2s ease-in-out infinite',
        'spin-slow': 'spin-slow 22s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
