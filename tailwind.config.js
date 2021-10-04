module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... } DESKTOP

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... } LAPTOP

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'min': '1px', 'max': '639px'},
      // => @media (max-width: 639px) { ... } TABLET
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
