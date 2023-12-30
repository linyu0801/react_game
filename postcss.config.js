module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production'
      ? {
          cssnano: {
            preset: [
              require('cssnano-preset-default'),
              { discardComments: false },
            ],
          },
        }
      : {}),
  },
};
