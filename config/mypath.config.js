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
