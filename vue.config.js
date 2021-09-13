const path = require('path')
const port = process.env.port || 9001; //配置端口号
module.exports = {
  lintOnSave: false,
  // 配置svg
  chainWebpack: config => {
    const dir = path.resolve(__dirname, 'src/assets/icons')
    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include.add(dir).end() // 包含 icons 目录
      .use('svg-sprite-loader-mod').loader('svg-sprite-loader-mod').options({ extract: false }).end()
      .use('svgo-loader').loader('svgo-loader')
      .tap(options => ({ ...options, plugins: [{ removeAttrs: { attrs: 'fill' } }] })).end()
    // 自动删除svg属性的默认颜色，以后让其全靠css样式控制
    config.plugin('svg-sprite').use(require('svg-sprite-loader-mod/plugin'), [{ plainSprite: true }])
    config.module.rule('svg').exclude.add(dir) // 其他 svg loader 排除 icons 目录
  },
  devServer: {
    port, //端口号就是自己设置的值
    public: require('os').networkInterfaces()[Object.keys(require('os').networkInterfaces())[0]][1].address + ':' + port //设置访问ip端口
  }
}