import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      spacing: {
        '13': '3.25rem', // 52px - 用于评论回复的缩进
      },
      colors: {
        'douyin-red': '#FE2C55', // 抖音主色
        'douyin-bg': '#121212', // 深色背景
        'douyin-card': '#1C1C1E', // 卡片背景
      },
      animation: {
        'like-pop': 'scale 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        spin: 'spin 1s linear infinite',
        'spin-slow': 'spin 2s linear infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        scale: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
} as Config;