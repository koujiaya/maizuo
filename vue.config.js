const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // configureWebpack

  lintOnSave: false, // 暂时关闭代码格式检测

  // 配置反向代理
  devServer: {
    proxy: {
      // '/ajax':{
      //   target:'https://m.maoyan.com',
      //   changeOringin:true
      // }
      '/kou': {
        target: 'https://m.maoyan.com',
        changeOringin: true,
        pathRewrite: {
          '^/kou': ''
        }
      },
      '/ayaya': {
        target: 'https://m.maizuo.com',
        changeOringin: true,
        pathRewrite: {
          '^/ayaya': ''
        }
      }
    }
  }
})
