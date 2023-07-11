const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/pages/**/*.js', './src/components/**/*.js'],
  darkMode: 'class',
  theme: {
    fontSize: {
      xs: ['.75rem', '1rem'],
      sm: ['.875rem', '1.25rem'],
      base: ['1rem', '1.5rem'],
      lg: ['1.125rem', '1.75rem'],
      xl: ['1.25rem', '1.75rem'],
      '2xl': ['1.5rem', '2rem'],
      '3xl': ['1.875rem', '2.25rem'],
      '4xl': ['2.25rem', '2.5rem'],
      '5xl': ['3rem', '1'],
      '6xl': ['3.75rem', '1'],
      '7xl': ['5rem', '1'],
      '8xl': ['6rem', '1'],
      '9xl': ['7rem', '1'],
      '10xl': ['9rem', '1'],
    },
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      mono: ['Roboto Mono', ...defaultTheme.fontFamily.mono],
    },
    extend: {
      screens: {
        '3xl': '1800px',
      },
      typography(theme) {
        return {
          dark: {
            css: {
              color: theme('colors.gray.300'),
              '[class~="lead"]': { color: theme('colors.gray.400') },
              a: { color: theme('colors.gray.100') },
              strong: { color: theme('colors.gray.100') },
              'ul > li::before': { backgroundColor: theme('colors.gray.700') },
              hr: { borderColor: theme('colors.gray.800') },
              blockquote: {
                color: theme('colors.gray.100'),
                borderLeftColor: theme('colors.gray.800'),
              },
              h1: { color: theme('colors.gray.100') },
              h2: { color: theme('colors.gray.100') },
              h3: { color: theme('colors.gray.100') },
              h4: { color: theme('colors.gray.100') },
              code: {
                color: theme('colors.gray.100'),
              },
              'a code': { color: theme('colors.gray.100') },
              thead: {
                color: theme('colors.gray.100'),
                borderBottomColor: theme('colors.gray.700'),
              },
              'tbody tr': { borderBottomColor: theme('colors.gray.800') },
            },
          },
        };
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
      },
      padding: { 'fluid-video': '56.25%' },
      colors: {
        base: {
          50: '#ffffff',
          100: '#fafafa',
          200: '#eaeaea',
          300: '#999999',
          400: '#888888',
          500: '#666666',
          600: '#444444',
          700: '#333333',
          800: '#111111',
          900: '#000000',
        },
        success: {
          lighter: '#D3E5FF',
          light: '#3291FF',
          default: '#0070F3',
          dark: '#0761D1',
        },
        error: {
          lighter: '#F7D4D6',
          light: '#FF1A1A',
          default: '#E00',
          dark: '#C50000',
        },
        warning: {
          lighter: '#FFEFCF',
          light: '#F7B955',
          default: '#F5A623',
          dark: '#AB570A',
        },
        cyan: {
          lighter: '#aaffec',
          light: '#79ffe1',
          default: '#50e3c2',
          dark: '#29bc9b',
        },
        violet: {
          lighter: '#e3d7fc',
          light: '#8a63d2',
          default: '#7928ca',
          dark: '#4c2889',
        },
        highlight: {
          alert: '#ff0080',
          purple: '#f81ce5',
          megenta: '#eb367f',
        },
      },
    },
  },
  variants: {
    extend: { opacity: ['disabled'], typography: ['dark'] },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
};
