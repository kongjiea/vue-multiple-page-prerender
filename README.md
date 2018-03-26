# vue-multiple-page-prerender
vue-cli多页面入口+预渲染

### 说明
自己在vue-cli基础上 
1、在config文件夹中新增myPath.js ，
```
//自主添加代码【注意模块名和模块js名字一致】
const assetsModuleName = 'register';  //目前的资源模块文件夹名  //strategy strategydetail
const rootModuleName = "dist";    //打包后的资源根目录
const secondPathModuleName = assetsModuleName ? assetsModuleName : 'index';  //如果有assetsModuleName 就显示打包到对应资源模块 否则默认为首页
const entryJsPath = assetsModuleName ? `src/pages/${assetsModuleName}/${assetsModuleName}` : 'src/main';    //如果为空就是默认首页 首页就是 strategydetail.js

module.exports = {
    assetsModuleName : assetsModuleName,
    rootModuleName : rootModuleName,
    secondPathModuleName : secondPathModuleName,
    entryJsPath : entryJsPath
}

```
2、然后修改webpack.base.conf.js的入口，
```
//自主手动添加
const myPath = require('../config/mypath.config');


module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    // app: './src/main.js'  //这里是修改的地方
    index: './' + myPath.entryJsPath  // app: './src/module/login/login2.js'
  },
  ...

```

3、修改config文件夹index.js的部分配置
```
//自主手动添加
const myPath = require('../config/mypath.config');

module.exports = {
  dev:{} //这里dev部分不修改
  build:{
    /*  这里4行注释，修改成下面的4行
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',*/


    index: path.resolve(__dirname, `../${myPath.rootModuleName}/${myPath.secondPathModuleName}/index.html`), // login 存放目录

    assetsRoot: path.resolve(__dirname,`../${myPath.rootModuleName}`), // 资源根目录
    assetsSubDirectory: myPath.secondPathModuleName,   // css 和 js的存放目录
    assetsPublicPath: '/',
    
    ...  //其他不修改

  }
}

```

4、修改webpack.prod.conf.js
```
//引入prerender插件
var PrerenderSpaPlugin = require('prerender-spa-plugin')

//在plugins 末尾添加预渲染插件
new PrerenderSpaPlugin(
  {
    staticDir: path.join(__dirname, '../dist'),
    routes: [ '/register'],   //这里要和入口文件名一致
    indexPath: path.resolve(__dirname, '../dist/register/index.html'),  //这很重要 指定模板路劲 这里的register应该改成可配置 这里测试写死
    captureAfterTime: 1000   //等待1秒 更多查看官方文档
  }
)


```


### 其他说明
a、prerender对vue的渲染基于路由（这里还没弄透彻不需要路由的情况）,所以在.vue模板中需要加上路由配置，配置就是该模块的名字（也就是会输出到dist文件夹下的文件夹名字）
b、不要忘记.vue文件模板上 加上<div id="app"></div> 包裹标签
