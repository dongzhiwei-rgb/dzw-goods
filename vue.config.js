const { defineConfig } = require('@vue/cli-service')
const path = require('path');
module.exports = defineConfig({
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      // 这三种 patterns 写法都是可以的
      // patterns: ["./src/assets/reset1.less", "./src/assets/reset2.less"]
      // patterns: "./src/assets/reset.less"
	  patterns: [
        path.join(__dirname, './src/assets/styles/mixins.less'),//这里的路径不能使用 @ 符号，否则会报错
        path.join(__dirname, './src/assets/styles/variables.less')
      ]
    }
  }

})
