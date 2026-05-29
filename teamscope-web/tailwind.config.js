/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'SF Pro', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      colors: {
        notion: {
          // 浅色
          bg:      '#f7f6f3',
          card:    '#ffffff',
          text:    '#37352f',
          dim:     '#9b9a97',
          subtle:  '#b4b4b4',
          border:  '#e9e9e7',
          hover:   '#f1f1ef',
          active:  '#e8e7e4',
          // 深色
          'dark-bg':      '#191919',
          'dark-card':    '#252525',
          'dark-text':    '#e4e4e4',
          'dark-dim':     '#9b9b9b',
          'dark-border':  '#333333',
          'dark-hover':   '#2f2f2f',
          'dark-active':  '#3a3a3a',
          // 强调色（双主题通用）
          blue:    '#2e6eff',
          red:     '#EB5757',
          orange:  '#F2994A',
          green:   '#0F9D58',
          purple:  '#9B51E0',
        },
      },
      borderRadius: {
        notion: '8px',
      },
      boxShadow: {
        'notion':    '0 1px 2px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.04)',
        'notion-sm': '0 1px 2px rgba(0,0,0,0.03)',
        'notion-md': '0 4px 12px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
};
