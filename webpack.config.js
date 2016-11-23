const webpack = require('webpack')

module.exports = {
  entry: {
    bundle: './src/main.js',
  },
  output: {
    filename: '[name].js',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.UglifyJsPlugin(),
  ],
}
