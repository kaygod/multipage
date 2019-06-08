># multipage
>## 使用webpack构建多页应用的模板
> * 简介
>     >  本例是一个用webpack构建多页面应用的脚手架工具,集成了sass,babel可直接使用最新的语法特性编写css或者js.整个项目的源代码全部位于src目录中.其中fonts为字体图标文件夹,public是可能需要用到的一些静态资源文件夹,比如一些json文件.如果需要创建一个页面,那么需要在src下面html,css,js三个文件夹中分别创建.经过打包最终会在dist目录下生成html,js,css相对应的文件夹.其中css文件最终会被合并.
> * 使用
>     > 1.将项目clone到本地,运行 npm install  
        2.运行npm run dev,启动开发模式.接着可以在dist目录下启动一个http-server服务器,将静态资源启动起来.编写src源代码,会触发重新打包编译,刷新浏览器就可以看到效果.  
        3.项目开发完毕之后,先删除dist目录,然后运行npm run bundle,即可得到最终的打包文件  
> * 注意事项
>      > css最终会被打包成2个文件,分别是global.css和style.css,global.css是全局样式,所以src/css/global.scss这个文件一定不要删除和改名,它里面可以填写全局或者字体图标的一些样式.style里面装的是你所有的页面的css样式的合并代码.每创建一个页面就需要在src/css文件夹下面创建一个样式文件,文件要和html文件同名,但一定要以.scss后缀名结尾.如何在某个页面引入样式文件呢,只需要在对应的js引入样式即可,可参照src/js/index.js.  
        打包最终生成的结果dist/js下的js文件会和src/js下面的js文件一一对应.其中有一个文件比较特殊,即common.js.它是代表全局的js文件,每个html都会将它引入,你可以在common.js中写一些静态常量和函数供其他页面来使用.src/js/common.js这个文件一定不要删除和改名.创建的js文件必须和对应的html文件同名.
        public文件夹和imgs文件夹都是直接复制到dist目录中的,所以在html可以直接根据路径引用响应的图片.  
        如果需要引入第三方的库,可参照src/js/index.js.本例已经引入了jquery.          
