const path = require('path');
const webpack = require('webpack');

const rootpath = path.resolve(__dirname, '..');

module.exports = (env = {}) => ({
  mode: 'development',

  devtool: 'inline-source-map',

  plugins: env.test
    ? []
    : [
        new webpack.HotModuleReplacementPlugin(),
      ],

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(j|t)sx?$/,
        use: ['eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
    ],
  },

  devServer: {
    hot: true,
    contentBase: `${rootpath}/dist`,
    host: '0.0.0.0',
    port: process.env.WEBPACK_DEV_SERVER_PORT,
    proxy: {
      '/api': {
        target: process.env.API_URL,
        pathRewrite: { '^/api': '' },
      },
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
  },
});
