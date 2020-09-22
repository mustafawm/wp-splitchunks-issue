module.exports = {
  future: {
    uniformColorPalette: true,
    applyComplexClasses: true,
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    content: ['./src/**/*.tsx', './src/html/index.template.html'],
    options: {
      // whitelist: [/datepicker/, /slick/, /leaflet/],
      whitelist: [/slick/, /leaflet/],
    },
  },
  theme: {
    extend: {
      boxShadow: {
        outline: '0 0 0 2px rgba(66, 153, 225, 0.5)',
      },
      fontSize: {
        '7xl': '4.5rem',
        '8xl': '5rem',
      },
      flex: {
        2: '2 2 0%',
        3: '3 3 0%',
        4: '4 4 0%',
      },
      colors: {
        ice: '#FBFCFC',
        grey: '#F8F8F8',
      },
      minWidth: {
        0: '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        full: '100%',
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
  },
  plugins: [],
};
