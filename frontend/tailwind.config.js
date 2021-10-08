// const { colors } = require('tailwindcss/defaultTheme');
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],

  darkMode: 'class', // or 'media' or 'class'

  theme: {
    // Add Font to Sans Font Array
    fontFamily: {
      sans: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Inter"',
        'ui-sans-serif',
        'system-ui',
        'Helvetica Neue',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
        'Open',
      ],
      serif: ['"Literata"', ...defaultTheme.fontFamily.serif],
    },

    // screens: {
    //   'sm':   '640px',
    //   'md':   '768px',
    //   'lg':   '1024px',
    //   'xl':   '1280px',
    //   '2xl':  '1536px',
    //   '3xl':  '1800px',
    // },

    // Set default container to align center and have a 1rem side padding
    // container: {
    //   center: true,
    // },

    extend: {
      // Mapping Colors
      colors: {
        primary: colors.purple,
        secondary: colors.yellow,
        alternative: colors.green,
        'purple-mixin-700': '#9C60FF',
        'purple-mixin-400': '#5600E5',
        'main-purple': '#8B5CF6',
        'yellow-nft4': '#FBBF24',

        'bluegray-50': '#f8fafd',
        'bluegray-100': '#ebf1f9',

        'shadepurple-50': '#fafaff',
        'shadepurple-100': '#eff0fe',

        'deeppurple-50': '#411980',
        'deeppurple-100': '#3c1775',
        'deeppurple-200': '#36156a',
        'deeppurple-300': '#311360',
        'deeppurple-400': '#2b1155',
        'deeppurple-500': '#260f4b',
        'deeppurple-600': '#210c40',
        'deeppurple-700': '#1b0a35',
        'deeppurple-800': '#16082b',
        'deeppurple-900': '#100620',

        'shadeyellow-50': '#fffcf0',
        'shadeyellow-100': '#fff5cc',
        'shadeyellow-200': '#feeec5',

        'deepgray-50': '#0c121d',
        'deepgray-100': '#0a0e17',
        'deepgray-200': '#080b12',
      },

      // Extra Font Sizes
      fontSize: {
        '2xs': ['0.65rem', '1'],
        '3xs': ['0.5rem', '1'],
      },

      // Added Percentage Spacing
      margin: {
        '4p': '4%',
        '8p': '8%',
        '12p': '12%',
        '16p': '16%',
      },

      padding: {
        '1px': '1px',
        '3px': '3px',
        '2px': '2px',
        '4px': '4px',
        '4p': '4%',
        '8p': '8%',
        '12p': '12%',
        '16p': '16%',
      },

      // Added Icon Sizes
      width: {
        'px-16': '16px',
        'px-24': '24px',
        'px-32': '32px',
        'px-40': '40px',
        'px-48': '48px',
        'px-56': '56px',
        'px-64': '64px',
        'px-80': '80px',
        'px-88': '88px',
        'px-96': '96px',
        'px-104': '104px',
        'px-112': '112px',
        'px-128': '128px',
      },

      height: {
        'px-16': '16px',
        'px-24': '24px',
        'px-32': '32px',
        'px-40': '40px',
        'px-48': '48px',
        'px-56': '56px',
        'px-64': '64px',
        'px-80': '80px',
        'px-88': '88px',
        'px-96': '96px',
        'px-104': '104px',
        'px-112': '112px',
        'px-128': '128px',
      },

      // Added zIndex
      zIndex: {
        '-1': '-1',
        '-2': '-2',
      },
    },
  },

  variants: {
    scale: ['responsive', 'hover', 'focus', 'group-hover'],
    fontSize: ['responsive', 'hover', 'focus', 'group-hover'],
    textColor: ['dark', 'responsive', 'hover', 'focus', 'group-hover'],
    textOpacity: ['dark', 'responsive', 'hover', 'focus', 'group-hover'],
    display: ['responsive', 'hover', 'focus', 'group-hover'],
    transform: ['responsive', 'hover', 'focus', 'group-hover'],
    translate: ['responsive', 'hover', 'focus', 'group-hover'],
    opacity: ['dark', 'responsive', 'hover', 'focus', 'group-hover'],
    backgroundColor: ['dark', 'responsive', 'hover', 'focus', 'group-hover'],
    backgroundImage: ['dark', 'responsive', 'hover', 'focus', 'group-hover'],
    gradientColorStops: ['dark', 'responsive', 'hover', 'focus', 'group-hover'],
    width: ['responsive', 'hover', 'focus', 'group-hover'],
    padding: ['responsive', 'hover', 'focus', 'group-hover'],
    margin: ['responsive', 'hover', 'focus', 'group-hover'],
  },

  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
