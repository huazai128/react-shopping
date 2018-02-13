const path = require('path'),
  webpack = require('webpack'),
  srcDir = path.resolve(process.cwd(), 'src'),
  imagePath = path.resolve(srcDir, 'img'),
  cssPath = path.resolve(srcDir, 'css'),
  jsPath = path.resolve(srcDir, 'js'),
  viewsPath = path.resolve(srcDir, 'views'),
  nodeModulesPath = path.resolve(__dirname, 'node_modules'),
  autoprefixer = require('autoprefixer'),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  pxtorem = require('postcss-pxtorem'),
  bundleConfig = require("./dist/bundle-config.json"),
  CleanPlugin = require('clean-webpack-plugin'),
  pkg = require('./package.json');

module.exports = {
  entry: {
    index: ['babel-polyfill', path.join(__dirname, "src/index.tsx")]
  },
  output: {
    publicPath: './',
    filename: 'bundle.js',
    path: path.join(__dirname, "dist/static/"), //文件输出目录
    filename: 'core/[name].[hash:5].js', //根据入口文件输出的对应多个文件名
    chunkFilename: 'core/[name].[chunkhash:5].js'
  },
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.react.js'],
    alias: { //配置别名，在项目中可缩减引用路径
      'img': path.join(srcDir, 'img'),
      'css': path.join(srcDir, 'css'),
      'js': path.join(srcDir, 'js'),
      'views': path.join(srcDir, 'views'),
      "components": path.join(srcDir, 'components')
    }
  },
  // loaders
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: [nodeModulesPath],
        include: [srcDir],
        loader: "babel-loader",
      }, {
        test: /\.tsx?$/,
        use: ['babel-loader', 'awesome-typescript-loader'] ,
      },
      {
        test: /\.(eot|woff|woff2|ttf|png|jpe?g|gif|mp4|webm)(\?\S*)?$/,
        exclude: [nodeModulesPath],
        include: [srcDir],
        loader: 'url-loader?limit=8192&name=img/[name].[ext]',
      }, {
        test: /\.(scss|sass|css)$/,
        use: ["style-loader", {
          loader: "css-loader",
          options: {
            sourceMap: true
          }
        }, {
          loader: "postcss-loader",
          options: {
            sourceMap: true,
            plugins: [
              autoprefixer, pxtorem({
                rootValue: 100,
                minPixelValue: 3,
                propWhiteList: [],
              })
            ]
          },
        }, {
          loader: "sass-loader",
          options: {
            sourceMap: true,
            imagePath: imagePath,
            includePaths: [cssPath]
          }
        }]
      }, {
        test: /\.(svg)$/i,
        loader: 'svg-sprite-loader',
        include: [require.resolve('antd-mobile').replace(/warn\.js$/, '')],
      },
      {
        test: /\.(less)$/,
        use: [
          'style-loader',
          'css-loader',
          { loader: 'less-loader', options: { modifyVars: pkg.theme } },
        ],
      },
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ // 打包压缩
      output: {
        comments: false, // 去掉注释
      },
      compress: {
        warnings: false // 去掉
      }
    }),
    // new webpack.HotModuleReplacementPlugin(), // 开启全局的模块热替换（HMR）在开发环境下配置
    new webpack.DllReferencePlugin({ // 加快webpack打包速度
      context: __dirname,
      manifest: require('./dist/static/dll/vendor-manifest.json')
    }),
    new CopyWebpackPlugin([{ // 复制指定文件
      from: path.resolve(__dirname, './src/js/lib'),
      to: path.resolve(__dirname, './dist/static/lib')
    }]),
    // new ExtractTextPlugin('css/[name].[contenthash:5].css'),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/html/index.html"), // html
      bundleName: '.' + bundleConfig.vendor.js,
      inject: true
    })
  ]
}

// webpackConfig.plugins.push(new CleanPlugin(['core'], {
//   root: path.join(__dirname, "dist/static"),
//   verbose: true,
//   dry: false
// }));
// webpackConfig.plugins.push(new CleanPlugin(['img'], {
//   root: path.join(__dirname, "dist/static"),
//   verbose: true,
//   dry: false
// }));
// webpackConfig.plugins.push(new CleanPlugin(['lib'], {
//   root: path.join(__dirname, "dist/static"),
//   verbose: true,
//   dry: false
// }));