var http = require('http');

//注入自定义模块config
var config = require('./config');

http.createServer((request,response)=>{

    response.writeHead(200,{'ContentType':'text/html;charset=utf-8'});

    if(request.url !== '/favicon.ico'){
        response.write(`zhanghui.chen 666`);

        console.log('访问了');

        //打印出config模块
        console.log(config);
    }
    response.end();

}).listen(8000);

console.log('server running at 127.0.0.1:8000')