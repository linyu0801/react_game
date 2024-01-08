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
      '@babel/plugin-transform-runtime', // babel會為編譯的文件寫輔助程式碼，減少輔助函示重複重新定義改用引入方式，減少程式碼體積
      !api.env('production') && 'react-refresh/babel',
    ].filter(Boolean),
  };
};
// React Fast Refresh 介紹 https://reurl.cc/QbbVg2
// @babel/plugin-transform-runtime
