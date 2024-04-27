module.exports = (api) => {
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
        },
      ],
      ['@babel/preset-react', { runtime: 'automatic' }],
      '@babel/preset-typescript',
    ],
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-runtime',
      [
        'babel-plugin-styled-components',
        {
          ssr: false,
        },
      ],
      !api.env('production') && 'react-refresh/babel',
    ].filter(Boolean),
  };
};
