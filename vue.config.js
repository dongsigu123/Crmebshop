module.exports={
  publicPath:process.env.NODE_ENV=='production'?"./":"/",
  outputDir:'dist',//编译的输出目录
  assetsDir:'static',//打包资源文件 js css img
  runtimeCompiler:true,
}