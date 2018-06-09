const http = require('http');
const url = require('url');

//自定义路由模块
const routing = require('./module/routing');

http.createServer((request, response) => {
    //设置响应头
    response.writeHead(200,{'ContentType':'text/html;charset=utf-8'});

    //获取到请求路由
    let pathname = url.parse(request.url).pathname.replace('/','');

    //路由正确导航到路由模块，错误导航到index路由模块
    try{
        routing[pathname](request, response);

    }catch(err){

        routing['index'](request, response);

    }

}).listen(8000);

console.log('server running at 127.0.0.1:8000');


