const path = require("path"),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  entry: {
    vendor: ['react', 'react-dom'],
  },
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'dist/static'),
    filename: 'dll/[name].dll.[hash:5].js',
    library: '[name]_library'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json','ts','tsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.DllPlugin({
      context: __dirname,
      path: path.join(__dirname, 'dist/static/dll/[name]-manifest.json'),
      name: '[name]_library'
    }),
    new AssetsPlugin({
      filename: 'dist/bundle-config.json',
      path:  path.resolve(__dirname)
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
      compress: {
        warnings: false
      }
    })
  ]
}