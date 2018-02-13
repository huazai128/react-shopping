const webpack = require('webpack');
const path = require('path'),
  srcDir = path.resolve(process.cwd(), 'src'),
  imagePath = path.resolve(srcDir, 'img'),
  cssPath = path.resolve(srcDir, 'css'),
  jsPath = path.resolve(srcDir, 'js'),
  viewsPath = path.resolve(srcDir, 'views'),
  nodeModulesPath = path.resolve(__dirname, 'node_modules'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  bundleConfig = require("./dist/bundle-config.json"),
  CleanPlugin = require('clean-webpack-plugin'),
  pxtorem = require('postcss-pxtorem'), // 吧css计算成rem 
  autoprefixer = require('autoprefixer'), // 自动添加兼容
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  pkg = require('./package.json');
const { TsConfigPathsPlugin,CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
  entry: {
    index: [
      'babel-polyfill',
      // 'react-hot-loader/patch', // 开启react代码的模块热替换（HMR）
      'webpack-dev-server/client?http://0.0.0.0:8082', // 为webpack-dev-server的环境打包好运行代码,然后连接到指定服务器域名与端口
      'webpack/hot/only-dev-server', //然后连接到指定服务器域名与端口, only- 意味着只有成功更新运行代码才会执行热替换（HMR）
      path.join(__dirname, "src/index.tsx")
    ],
  },
  output: {
    publicPath: './',
    filename: 'bundle.js',
    path: path.join(__dirname, "dist/static/"), //文件输出目录
    filename: 'core/[name].[hash:5].js', //根据入口文件输出的对应多个文件名
    chunkFilename: 'core/[name].[chunkhash:5].js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.react.js'],
    alias: { //配置别名，在项目中可缩减引用路径
      'img': path.join(srcDir, 'img'),
      'css': path.join(srcDir, 'css'),
      'js': path.join(srcDir, 'js'),
      'views': path.join(srcDir, 'views'),
      "@components": path.join(srcDir, 'components'),
      "@interface": path.join(srcDir, 'interface')
    },
    plugins:[
      new TsConfigPathsPlugin({
        configFileName: "tsconfig.json",
        compiler: "typescript",
      })
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: 'dist/static/',
    hot: true,
    inline: true,
    port: "8082",
    disableHostCheck: true,
    publicPath: '/',
  },
  // loaders
  module: {
    rules: [{
        test: /\.tsx?$/,
        use: ['babel-loader', 'awesome-typescript-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [nodeModulesPath],
        include: [srcDir],
        loader: "babel-loader", // 这里的配置是.babelrc目录编译
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
          {
            loader: 'less-loader',
            options: {
              modifyVars: pkg.theme
            }
          },
        ],
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 开启全局的模块热替换（HMR）
    new webpack.DllReferencePlugin({ // 加快webpack打包速度
      context: __dirname,
      manifest: require('./dist/static/dll/vendor-manifest.json')
    }),
    new CheckerPlugin(),
    new CopyWebpackPlugin([{ // 复制指定文件
      from: path.resolve(__dirname, './src/js/lib'),
      to: path.resolve(__dirname, './dist/static/lib')
    }]),
    // new ExtractTextPlugin('css/[name].[contenthash:5].css'),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/html/index.html"), // html
      bundleName: bundleConfig.vendor.js,
      inject: true
    }),
    
  ]
}