module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false,
  theme: {
    colors: {
      blue: {
        primary: '#40476A',
        DEFAULT: '#40476A',
        2: '#1B3569',
        6: '#6B74A5',
      },
      blueop: {
        primary: 'rgba(60,69, 189, 0.87)',
        DEFAULT: 'rgba(60,69, 189, 0.87)',
        2: 'rgba(60,69, 189, 0.02)',
        6: 'rgba(60,69, 189, 0.06)',
        38: 'rgba(60,69, 189, 0.38)',
        60: 'rgba(60,69, 189, 0.60)',
      },
      white: '#FFFFFF',
      black: {
        DEFAULT: '#222222',
        medium: '#4B4A4A',
        light: '#545454',
        disable: '#797979',
      },
      blackop: {
        DEFAULT: '#000A02',
        87: 'rgba(0,10, 2, 0.87)',
        60: 'rgba(0,10, 2, 0.60)',
        38: 'rgba(0,10, 2, 0.38)',
        16: 'rgba(0,10, 2, 0.16)',
        6: 'rgba(0,10, 2, 0.06)',
        3: 'rgba(0,10, 2, 0.03)',
      },
      gray: {
        light: '#909090',
        DEFAULT: '#CCCCCC',
        hover: '#F4F4F4',
      },
      red: {
        dark: '#AF3838',
        DEFAULT: '#D14040',
        light: '#ED7B7B',
      },
      yellow: {
        dark: '#E3D209',
        DEFAULT: '#FFEC07',
        light: '#FFF686',
      },
    },
    fontFamily: {
      noto: ['Noto Sans JP', 'sans-serif'],
      roboto: ['Roboto', 'sans-serif'],
      mont: ['Montserrat', 'sans-seri'],
      hind: ['Hind', 'sans-serif'],
      zenkaku: ['Zen Kaku Gothic New', 'sans-serif'],
    },
    fontWeignt: {
      light: 300,
      reg: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
    },

    extend: {
      keyframes: {
        appearFull: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        appearHalf: {
          '0%': { opacity: 0 },
          '100%': { opacity: 0.6 },
        },
        stretchSideBar: {
          '0%': { width: '28px' },
          '100%': { width: '44px' },
        },
        roundUp: {
          '0%': { 'border-radius': '0px' },
          '100%': { 'border-radius': '9999px' },
        },
        changeGreen: {
          '0%': { color: '#CCCCCC' },
          '100%': { color: '#A3CC98' },
        },
        changeRed: {
          '0%': { color: '#CCCCCC' },
          '100%': { color: '#B3754D' },
        },
        changeYellow: {
          '0%': { color: '#CCCCCC' },
          '100%': { color: '#CEBB53' },
        },
        swipe: {
          '0%': { transform: 'rotate(0)' },
          '30%': { transform: 'rotate(0)' },
          '70%': { transform: 'rotate(40deg)' },
          '100%': { transform: 'rotate(0)' },
        },
      },
      animation: {
        appearFull: 'appearFull 1s ease 2s 1 forwards',
        appearHalf: 'appearHalf 1s ease 2s 1 forwards',
        appearFullFast: 'appearFull 0.5s ease 0s 1 forwards',
        stretchSideBar: 'stretchSideBar 0.5s ease 0s 1 forwards',
        roundUp: 'roundUp 1s ease 0s 1 forwards',
        changeGreen: 'changeGreen 1s linear 0s 1 forwards',
        swipe: 'swipe 4s ease 0s infinite forwards',
      },
      boxShadow: { works: '0 3px 16px 0 rgba(0, 0, 0, 0.16)' },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
