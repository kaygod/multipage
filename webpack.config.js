
const glob = require("glob")

const path = require("path");

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 

const TransferWebpackPlugin = require('transfer-webpack-plugin');

const plugins=getPlugins();

module.exports={
   
   mode:"development",
   entry:getEntry(),
   module:{    
     rules:[
         {
             test:/\.(scss|css)$/,
             use:[
                MiniCssExtractPlugin.loader,
                {
                    loader:"css-loader",
                    options:{
                        importLoaders:2 //这个在scss文件通过@import引入其他scss的时候让其先走后面的2个loader,保证执行顺序
                     } 
                },"sass-loader","postcss-loader"
             ]
         },
         {
             test:/\.js$/,
             include: [
                path.resolve(__dirname, 'src')
            ],
            use:"babel-loader"
         },
         {
            test:/\.(eot|ttf|svg|woff|woff2)$/, 
            use:[{
               loader:"file-loader",
               options:{
                outputPath:"../fonts"
               }
            }] 
         }
     ]
   },
   optimization: {
    splitChunks: {
        cacheGroups: {
        library: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
        },
        commons: {
            test: /((common)|(common\.js))$/,
            name: 'common',
            chunks: 'all',
            enforce: true,
        },  
        styles: {
            name: 'style',
            test: /\.scss$/,
            chunks: 'all',
            enforce: true,
            priority:-20
        },
        globalVendor: {
            name: 'global',
            test:  /((global\.scss)|(\.css))$/,
            chunks: 'all',
            enforce: true,
            priority:-10
        }
     }
    }
   }, 
   output:{
     filename:"[name].[hash].js",
     path:path.resolve(__dirname,"dist/js")
   },
   plugins:plugins

}


/**
 *  获取插件列表
 */
function getPlugins(){

    let plugins=[
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `../css/[name].[hash].css`
        }),
        new TransferWebpackPlugin([
            { from: 'src/imgs', to: '../imgs' },
            { from: 'src/public', to:'../public'}
        ])
    ]
   
    let htmlArray = glob.sync("./src/html/*.html");

    htmlArray.forEach((v)=>{
        let chunk = entryHtmlHandler(v);
        if(chunk != "common"){ //是公共的js文件就不单独创建页面
          
            let obj={
                chunks:["vendors",chunk,"common","style","global"],
                template:v,
                filename:path.resolve(__dirname,`dist/html/${chunk}.html`)
            }
          
            plugins.push(
                new HtmlWebpackPlugin(obj)
            ); 

        }
    })

    return plugins;
}

/**
 * 获得所有文件的入口
 */
function getEntry(){

     let files= glob.sync("./src/js/*.js"),arr={};
      
     files.forEach((v)=>{
       let chunk=entryJsHandler(v);
       if(chunk != "common"){
          arr[chunk]=v;
       }
     })

     return arr;
 
}

/**
 * 对入口的数据进行处理
 * v是形如这样的数据:'./src/js/detail.js'
 */
function entryJsHandler(v){ 
   
  return v.slice(v.indexOf("js/")+3,v.lastIndexOf("."));

}

/**
 * 对入口的数据进行处理
 * v是形如这样的数据:'./src/html/index.html'
 */
function entryHtmlHandler(v){ 
   
    return v.slice(v.indexOf("html/")+5,v.lastIndexOf("."));
  
  }
  
