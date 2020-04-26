const path = require('path');
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
// const smp = new SpeedMeasurePlugin();
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const os = require('os');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = [
  'js',
  'css',
  'json',
  'txt',
  'html',
  'ico',
  'svg'
];
//__dirname 表示当前文件所在的目录的绝对路径
function resolve(dir) {
  return path.join(__dirname, dir);
}

const pageMethod = require('./pages.js');
const pages = pageMethod.pages();
const pageName = process.env.page;
const page = Object.create(null);
page[pageName] = pages[pageName];

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/online/' : '/',
  pages: page,
  outputDir: 'dist',
  assetsDir: 'static',
  parallel: os.cpus().length > 1,

  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  // css: {
  // 是否使用css分离插件 ExtractTextPlugin
  // extract: true,
  // 开启 CSS source maps?
  // sourceMap: false,
  // 启用 CSS modules for all css / pre-processor files.
  // modules: false,
  // css配置项
  // loaderOptions: {
  //   postcss: {
  //     plugins: [
  //       require('postcss-pxtorem')({
  //         rootValue: 100, // 换算的基数
  //         selectorBlackList: ['el', 'new'], // 忽略转换正则匹配项
  //         propList: ['*']
  //       }),
  //       require('autoprefixer')({
  //         browsers: ['last 2 versions', '> 1%']
  //       })
  //     ]
  //   }
  // }
  // },
  devServer: {
    port: 8888, // 端口号
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    https: false // https:{type:Boolean}
    // open: true, //配置自动启动浏览器
    // proxy: 'http://localhost:4000' // 配置跨域处理
    // proxy: {
    //     '/api': {
    //         target: '<url>',
    //         ws: true,
    //         changeOrigin: true
    //     },
    //     '/foo': {
    //         target: '<other_url>'
    //     }
    // },  // 配置多个代理
  },

  // 原型修改
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@first', resolve('src/pages/first'))
      .set('@second', resolve('src/pages/second'));
    if (process.env.NODE_ENV === 'production') {
      config.module
        .rule('images')
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
          bypassOnDebug: true
        })
        .end();
    }
    //  else {
    //   config.plugin('html').tap(args => {
    //     args[0].chunksSortMode = 'none';
    //     return args;
    //   });
    // }
  },

  // 合并修改
  // configureWebpack: smp.wrap({
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json']
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ['cache-loader', 'babel-loader'],
          include: path.resolve('src')
        }
      ]
    },
    plugins:
      process.env.NODE_ENV === 'production'
        ? [
            new HardSourceWebpackPlugin(),
            new UglifyJsPlugin({
              uglifyOptions: {
                // warnings: false,
                compress: {
                  drop_debugger: true,
                  drop_console: true
                },
                output: {
                  comments: false
                }
              },
              sourceMap: false,
              cache: true,
              parallel: true //并行
            }),
            new CompressionWebpackPlugin({
              test: new RegExp(
                '\\.(' + productionGzipExtensions.join('|') + ')$'
              ),
              algorithm: 'gzip',
              threshold: 10240,
              minRatio: 0.8
            })
          ]
        : [],
    // cdn
    externals: {
      echarts: 'echarts'
      // vue: 'Vue',
      // 'vue-router': 'VueRouter'
      // vuex: 'Vuex',
    }
    // }),
  },
  // 第三方插件配置,这是一个不进行任何 schema 验证的对象，因此它可以用来传递任何第三方插件选项。例如
  pluginOptions: {
    foo: {
      // 插件可以作为 `options.pluginOptions.foo` 访问这些选项。
    }
  }
};
// module.exports = smp.wrap(config)
