const path = require('path')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

const TITLE = 'choiceside'

module.exports = {
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    plugins: [
      new VuetifyLoaderPlugin()
    ],
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = TITLE
      args[0].favicon = path.resolve(__dirname, 'public', 'favicon.svg')
      args[0].template = path.resolve(__dirname, 'public', 'index.html')
      return args
    })
    config.plugin('pwa').tap((args) => {
      args[0].name = TITLE
      args[0].themeColor = '#8c9eff'
      args[0].backgroudColor = '#121212'
      args[0].msTileColor = '#8c9eff'
      return args
    })
  },
}
