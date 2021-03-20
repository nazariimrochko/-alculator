const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      template: `./webpack/index-prod.ejs`,
      version: baseWebpackConfig.externals.version,
      filename: './index.html',
      inject: false,
    }),
  ],
});
module.exports = new Promise((resolve) => {
  resolve(buildWebpackConfig);
});
