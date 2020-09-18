module.exports = {
    css: {
        loaderOptions: {
            css: {},
            postcss: {
                plugins: [
                    require('postcss-px2rem')({
                        remUnit: 37.5
                    })
                ]
            }
        }
        
    },
    devServer:{
        proxy:{
            '/api':{
                target:"http://10.9.70.187:3000",
                changeOrigin:true
            }
           
        }
    }
}