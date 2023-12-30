module.exports = (api) => {
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          
        },
      ],
      ["@babel/preset-react", { "runtime": "automatic" }]
    ],
    plugins: [
      '@babel/plugin-syntax-dynamic-import', // 支援動態導入（dynamic import）語法
      '@babel/plugin-proposal-class-properties',
      !api.env('production') && 'react-refresh/babel',
    ].filter(Boolean),
  };
};
// React Fast Refresh 介紹 https://reurl.cc/QbbVg2
// @babel/plugin-transform-runtime
