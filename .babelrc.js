module.exports = (api) => {
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
        },
      ],
      '@babel/preset-react',
    ],
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties',
      !api.env('production') && 'react-refresh/babel',
    ].filter(Boolean),
  };
};
// React Fast Refresh 介紹 https://reurl.cc/QbbVg2
// @babel/plugin-transform-runtime
