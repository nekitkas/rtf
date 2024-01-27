const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry:path.resolve(__dirname,'src/index.js'),
    output:{
       path: path.resolve(__dirname,'dist'),
       filename:"main.js",
       assetModuleFilename: 'assets/[name][ext]'
    },
    mode:'production',
    devServer:{
        port:9000,
        compress:true,
        hot:true,
        static:{
            directory:path.join(__dirname,'dist')
        }
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:["style-loader",'css-loader']
            },
            {
                test:/\.(png|svg|jpg|jpeg|gif)$/i,
                type:'asset/resource'
            }
        ]
    },
    plugins: [
        new webpack.ProgressPlugin((percentage, message, ...args) => {
            console.info((percentage * 100).toFixed(2) + '%', message, ...args);
        }),
        new webpack.IgnorePlugin({
            checkResource(resource) {
                // specify the assets to ignore
                return /userProfile\.svg/.test(resource);
            },
          }),
    ],
}