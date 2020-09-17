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
                target:"http://localhost:3000",
                changeOrigin:true
            }
           
        }
    }
}