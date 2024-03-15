const fs = require('fs')
const path = require('path')
const { defineConfig } = require('@vue/cli-service')
const { merge } = require('lodash')
// TODO 做成部署平台获取配置项
const OSS_SIT_URL = 'https://sit-static.crsec.com.cn'
const OSS_PROD_URL = 'https://prod-static.crsec.com.cn'

let publicPath = './'
let packageName = __dirname.split('/').pop()

if (process.env.VUE_APP_RELEASE === 'sit') {
  publicPath = `${OSS_SIT_URL}/biz-monorepo/${packageName}`
} else if (process.env.VUE_APP_RELEASE === 'prod') {
  publicPath = `${OSS_PROD_URL}/biz-monorepo/${packageName}`
}

// 获取 pages 文件夹下的所有目录
const pagesDir = path.resolve(__dirname, './pages')
let initPageName = ''
let pages = fs.readdirSync(pagesDir).reduce((pages, dir) => {
  // 检查每个目录下是否有 main.js 文件
  const mainPath = path.join(pagesDir, dir, 'main.js')
  if (fs.existsSync(mainPath)) {
    // 如果有 main.js 文件，则将此目录添加为入口
    pages[dir] = { entry: mainPath }
    initPageName = initPageName ? initPageName : dir
  }
  return pages
}, {})

module.exports = defineConfig({
  transpileDependencies: true,
  filenameHashing: true,
  css: {
    extract: process.env.VUE_APP_RELEASE !== 'dev',
  },
  pages: merge(pages, {
    'product-list': {
      title: '产品详情页',
    },
  }),
  publicPath,
  outputDir: `${packageName}`,
  devServer: {
    open: `/product-list.html`,
  },
  chainWebpack: (config) => {
    config.output.filename('js/[name].[hash].js').chunkFilename('js/[name].[hash].js').end()
  },
})
