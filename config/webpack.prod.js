const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const WebpackBundleAnalyzer =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// const CompressionPlugin = require('compression-webpack-plugin');


const webpackConfig = {
  entry: ['../src/index'], // 設置入口
  //   entry: './src/index.tsx',
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].[contenthash:8].chunk.js',
    path: path.resolve(__dirname, '../build'),
    // 用 __dirname 取得當前環境的路徑再由 path.resolve() 將相對路徑或路徑片段轉為絕對路徑，以確保在不同作業系統底下都能產出正確的路徑位置
    clean: true,
  },
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              // 2 => postcss-loader, sass-loader
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, './src')],
        use: {
          loader: 'babel-loader',
        },
      },
      // {
      //   test: /\.js$/,
      //   loader: 'esbuild-loader',
      //   options: {
      //     loader: 'jsx',
      //     target: 'es2015',
      //     jsx: 'automatic',
      //   },
      // },
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //   include: path.resolve(__dirname, 'src/img'),
      //   type: 'asset/resource',
      //   generator: {
      //     // [ext] 代表副檔名
      //     filename: 'images/[hash][ext]',
      //   },
      // },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: 'asset',
        generator: {
          filename: 'images/[hash][ext]',
        },
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
        generator: {
          filename: 'fonts/[hash][ext]',
        },
      },
      {
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: /url/, // *.svg?url => 作為圖片使用 ( css 中使用 )
        generator: {
          filename: 'icon/[hash][ext]',
        },
      },
      {
        test: /\.svg$/i,
        issuer: /\.jsx?$/,
        resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
        use: ['@svgr/webpack'],
        generator: {
          filename: 'icon/[hash][ext]',
        },
      },
    ],
  },
  plugins: [
    // HtmlWebpackPlugin 可以自動產生 index.html 與綁定檔案 script 會加上 defer 屬性
    new HtmlWebpackPlugin({
      filename: './index.html', // 要使用的模板
      template: 'public/index.html', // 匯出檔案的名稱。
      inject: 'body',
      // favicon: 'public/favicon.ico',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }), // 因為每次建置的應用程式都應該是唯一的所以 production 不需要加 hash
    // new CompressionPlugin({
    //   // filename: '[path].gz[query]', // 目標文件名稱
    //   algorithm: 'gzip', // 使用gzip 壓縮
    //   test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$/, // 壓縮文件類型
    //   threshold: 102400, // 對超過 100kb的數據壓縮
    //   minRatio: 0.8, // 最小壓縮比達到0.8時才會被壓縮
    //   // https://juejin.cn/post/7008072984858460196
    // }),
 
    isDevelopment && new ReactRefreshWebpackPlugin(),
    // isDevelopment && new WebpackBundleAnalyzer(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    // symlinks: false, // 未使用到 npm link 時不建立符號連結，減少解析工作量
    extensions: ['.js'],
    // 設定 webpack 要去找哪些副檔名的檔案 預設值是 ['.wasm', '.mjs', '.js', '.json'],
  },
  performance: {
    hints: false, // 禁用性能提示 編譯生成的檔案大小超出了預設的大小限制也不會有提示
    // maxEntrypointSize: 512000, // 限制入口點文件大小
    // maxAssetSize: 512000, // 限制靜態資源文件的大小
  },
  // performance => https://stackoverflow.com/questions/49348365/webpack-4-size-exceeds-the-recommended-limit-244-kib

  optimization: {
    // 開啟或關閉下一個選項： minimizer
    minimize: true,
    // 設定要用的 minimizer ，比如 terser 或是用來壓縮 css 的 css-minimizer-webpack-plugin
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
      new CssMinimizerPlugin({}),
    ],
    // minimizer: [
    //   new EsbuildPlugin({
    //     target: 'es2015', // Syntax to transpile to (see options below for possible values)
    //     css: true,
    //   }),
    // ],
    // 要不要有一個獨立的檔案來放 webpack 自己必要的程式碼
    // 因為這個檔案同時也會帶有必要的 module 的資訊，所以有時為了 cache 就必需要獨立出來
    runtimeChunk: 'single',
    // webpack 內部會給每個 module 一個 id ，用在 webpack 自己識別每個 module 上
    // 預設在線上環境是用載入的順序當 id ，用 hashed 的話就會用路徑產生一個 hash 當 id ，可以避免 id 改動
    // 這個 `hashed` 選項在 webpack v5 時被另一個更好的參數 `deterministic` 取代了
    moduleIds: 'deterministic', // hashed
    usedExports: true, // development tree shaking
    // 這個選項預設可以控制 webpack 怎麼處理 dynamic import 產生的額外的檔案
    splitChunks: {
      // 這邊的設定是一些通用的規則 折分module

      // 如果一個 module 在兩個以上的不同的 chunk 有用到就拆分出來
      minChunks: 2,
      // 拆出來的 chunk 至少要有這個大小 (單位是 bytes) ，否則就不拆
      minSize: 100000,
      // 若拆開來的 chunk 超過這個大小就想辦法再拆小一點
      maxSize: 10000000,
      chunks: 'all',
      // 可以自己手動設定檔案該怎麼拆 ( 最複雜 )
      cacheGroups: {
        vendors: {
          // node_modules里的代码
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          // name: 'vendors', 一定不要定义固定的name
          priority: -10, // 优先级
          enforce: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  cache: {
    type: 'filesystem',
  },
};


module.exports = webpackConfig;

// tree shaking 待配置
// terser
// esbuild-loader
// dayjs 語言包移除
// new webpack.ContextReplacementPlugin(
//   /moment[/\\]locale$/,
//   /zh-tw|en/
// );  須符合 zh-tw 或 en 保留。
