const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

module.exports = {
  devServer: {
    compress: true,
    inline: true,
    open: true,
    overlay: true,
    contentBase: path.join(__dirname, 'demo'),
  },
  devtool: 'source-map',
  entry: path.join(__dirname, 'demo/index.js'),
  output: {
    path: path.resolve(__dirname, 'demo'),
    filename: '[name].[hash].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'demo/index.html',
    }),
  ],
};
