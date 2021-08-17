// postCSS的配置文件
// PostCSS导出一个对象
module.exports = {
  // 配置要使用不同的插件
  plugins: {
    // 自动添加浏览器前缀，用来兼容不同的浏览器
    // VUE/Cli中已经在内部.browserlistrc默认配置了autoprefixer，所以以下配置没有问题，但是编译时会有警告
    // autoprefixer: {
    //   // 仅兼容Android和iOS的浏览器即可
    //   // 可以直接配置在.browserlistrc中
    //   browsers: ['Android >= 4.0','iOS >= 8'],
    // },
    // 把px转成rem
    'postcss-pxtorem': {
      // 表示根元素字体大小，它会根据根元素大小进行单位转换
      // 根据设计稿来设定：如果使用的是基于lib-flexable的REM适配方案，则应该设置为你的设计稿的十分之一
      rootValue: 37.5,
      // 需要转换的CSS属性，*就是所有带单位的属性都要转换
      // 仅转换width的话，propList: ['width']
      propList: ['*']
    }
  }
}
