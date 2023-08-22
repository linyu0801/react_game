const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: ['./src/index'], // 設置入口
  //   entry: './src/index.tsx',
  output: {
    // filename: '[name].bundle.js',
    filename: '[name].[chunkhash:8].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'inline-source-map' : false,
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
              importLoaders: 1,
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
      // {
      // 	test: /\.(js|jsx)$/,
      // 	exclude: /node_modules/,
      // 	use: {
      // 		loader: 'babel-loader',
      // 		options: { presets: ['@babel/preset-react'] },
      // 	},
      // 	// 編譯JSX
      // },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        // 載入圖片 替代 file-loader
      },
    ],
  },
  resolve: { extensions: ['.tsx', '.ts', '.js'] },
  performance: {
    hints: false, // 禁用性能提示 編譯生成的檔案大小超出了預設的大小限制也不會有提示
    maxEntrypointSize: 512000, // 限制入口點文件大小
    maxAssetSize: 512000, // 限制靜態資源文件的大小
  },
  // performance => https://stackoverflow.com/questions/49348365/webpack-4-size-exceeds-the-recommended-limit-244-kib
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: 'public/index.html',
      // favicon: 'public/favicon.ico',
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].[hash].css' : '[name].css',
      chunkFilename: isDevelopment ? '[id].[hash].css' : '[id].css',
    }), // 因為每次建置的應用程式都應該是唯一的所以 production 不需要加 hash
    new CompressionPlugin({
      // filename: '[path].gz[query]', // 目標文件名稱
      algorithm: 'gzip', // 使用gzip 壓縮
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$/, // 壓縮文件類型
      threshold: 102400, // 對超過 100kb的數據壓縮
      minRatio: 0.8, // 最小壓縮比達到0.8時才會被壓縮
      // https://juejin.cn/post/7008072984858460196
    }),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),

  devServer: {
    static: './', // 存取靜態資源的目錄 cra 設定為 public
    port: 3010,
    historyApiFallback: true, // 在SPA頁面中，依賴HTML5的history模式 配合react-router-dom使用
    host: 'localhost', // 預設是 localhost，設定則可讓外網存取
    compress: true, // 使用 gzip 壓縮
    hot: true, // 打開 HMR
    open: true, // 打開瀏覽器
  },
};
