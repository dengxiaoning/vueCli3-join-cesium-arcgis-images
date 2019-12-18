
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? './'
        : '/',
    devServer: {
        port:18080,
        proxy: {
            '^/api': {
                target: 'http://127.0.0.1:808',
                changeOrigin: true,
                pathRewrite:{
                    '^/api':''
                }
            },
        }
    }
}