
//npm install -D webpack webpack-cli  babel-core babel-loader babel-preset-env

module.exports = {
    mode: 'production',
    // mode: 'none',
    entry: {
        block: './src/resizeBlock.js',
        image: './src/resizeImage.js',
    },
    output: {
        filename: 'resize[name].js',
        path: __dirname + '/dist',

        library: 'resize',
        libraryTarget: 'umd',
        umdNamedDefine: false
    },
    watch:true,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    plugins: []
}