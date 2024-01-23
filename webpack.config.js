const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const os = require('os');

const threads = os.cpus().length; // cpu核心數
const webpackConfig = (env, argv) => {
  const isDevelopment = argv.mode !== 'production';
  return {
    entry: ['./src/index.tsx'], // 設置入口
    output: {
      filename: isDevelopment ? 'js/[name].js' : 'js/[name].[contenthash:8].js',
      chunkFilename: isDevelopment
        ? 'js/[name].chunk.js'
        : 'js/[name].[contenthash:8].chunk.js',

      assetModuleFilename: 'media/[hash:10][ext][query]',
      path: path.resolve(__dirname, 'build'),
      clean: true,
    },
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'cheap-module-source-map' : 'source-map',
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          exclude: /node_modules/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'thread-loader', // 開啟多執行續
              options: {
                works: threads, // 執行續數量
              },
            },
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true, // 開啟 babel cache
                cacheCompression: false, // 關閉 cache 檔案的壓縮，可以加快編譯
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|webp)$/,
          type: 'asset',
          include: path.resolve(__dirname, 'src'),
          parser: {
            dataUrlCondition: {
              // 小於 10kb 圖片轉 base64 可減少 request 但size會變大一點
              maxSize: 10 * 1024,
            },
          },
        },
        // 音檔、影片檔也放 asset/resource
        {
          test: /\.(ttf|woff2?)$/,
          type: 'asset/resource',
          include: path.resolve(__dirname, 'src'),
        },
        {
          test: /\.svg$/i,
          type: 'asset',
          resourceQuery: /url/, // *.svg?url => 作為圖片使用 ( css 中使用 )
          include: path.resolve(__dirname, 'src'),
        },
        {
          test: /\.svg$/i,
          issuer: /\.jsx?$/,
          resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
          use: ['@svgr/webpack'],
          include: path.resolve(__dirname, 'src'),
        },
      ],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      symlinks: false, // 未使用到 npm link 時不建立符號連結，減少解析工作量
      extensions: ['.tsx', '.ts', '.js'],
      // 設定 webpack 要去找哪些副檔名的檔案 預設值是 ['.wasm', '.mjs', '.js', '.json'],
    },
    performance: false, // 關閉效能提示，提升打包速度,
    // performance => https://stackoverflow.com/questions/49348365/webpack-4-size-exceeds-the-recommended-limit-244-kib
    plugins: [
      // HtmlWebpackPlugin 可以自動產生 index.html 與綁定 js 等檔案
      new HtmlWebpackPlugin({
        filename: './index.html', // 要使用的模板
        template: 'public/index.html', // 匯出檔案的名稱。
        inject: 'body',
        // favicon: 'public/favicon.ico',
      }),
      new MiniCssExtractPlugin({
        filename: isDevelopment ? 'css/[name].[hash].css' : 'css/[name].css',
        chunkFilename: isDevelopment ? 'css/[id].[hash].css' : 'css/[id].css',
      }),

      new ESLintPlugin({
        context: path.resolve(__dirname, 'src'), // 只檢查 src 底下的檔案
        // threads,
        cache: true,
        extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
        ignore: true,
        useEslintrc: true,
      }),
      isDevelopment && new ReactRefreshWebpackPlugin({ overlay: false }),
    ].filter(Boolean),

    optimization: {
      // 開啟或關閉下一個選項： minimizer
      minimize: true,
      // 設定要用的 minimizer ，比如 terser 或是用來壓縮 css 的 css-minimizer-webpack-plugin
      minimizer: [
        new TerserPlugin({ parallel: threads }), // 預設： os.cpus().length - 1
        new CssMinimizerPlugin(),
      ],

      runtimeChunk: {
        name: (entrypoint) => `runtime~${entrypoint.name}.js`,
      },
      moduleIds: 'deterministic', // hashed
      usedExports: true, // development tree shaking
      splitChunks: {
        minChunks: 2,
        minSize: 100000,
        maxSize: 10000000,
        chunks: 'all',
        cacheGroups: {
          // react 相關 lib 單獨打包
          reactLib: {
            test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|@reduxjs\/toolkit\/dist)[\\/]/,
            name: 'react-lib',
            chunks: 'all',
            enforce: true,
            priority: 40,
            reuseExistingChunk: true,
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            // name: 'vendors', 一定不要定义固定的name
            priority: -10, // 优先级
            enforce: true,
            reuseExistingChunk: true,
          },
          commons: {
            chunks: 'all',
            minSize: 0, // 預設為 20 kb，為抽取共用 function 可以設定小一點
            minChunks: 2, // 被引用兩次以上才抽取
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
    devServer: {
      static: './', // 存取靜態資源的目錄 cra 設定為 public
      port: 8000,
      historyApiFallback: true, // 在SPA頁面中，依賴HTML5的history模式 配合react-router-dom使用
      host: 'localhost', // 預設是 localhost，設定則可讓外網存取
      compress: true, // 使用 gzip 壓縮
      hot: true, // 打開 HMR  ( js 要另外設定 loader ex: vue-loader / react-hot-loader ) 預設開啟
      open: true, // 打開瀏覽器
      client: {
        overlay: {
          errors: true,
          warnings: false,
          runtimeErrors: true,
        },
      },
    },
    cache: {
      type: 'filesystem',
      store: 'pack',
    },
  };
};

module.exports = webpackConfig;
