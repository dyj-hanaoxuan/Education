// setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function(app) {
    app.use(
        createProxyMiddleware(
            '/api',
            {  //`Api`是需要转发的请求
<<<<<<< HEAD
            // target: 'http://172.16.6.131:8888',  // 这里是接口服务器地址
                // target: 'http://192.168.43.12:8768',//王瑶家里ip
                target: 'http://172.16.6.46:8762',// 宋宇峰ip
                // target: 'http://172.16.6.138:8888',
=======
            // target: 'http://172.16.6.131:8888',
                target: 'http://172.16.6.24:8768',
            //     target: 'http://192.168.43.186:8888',
>>>>>>> 8f7fab1a8c77dd2dc9901f138629fdb72426eba7
            changeOrigin: true,
            pathRewrite: {
                "^/api": ""
            }
        }),
    )
}
