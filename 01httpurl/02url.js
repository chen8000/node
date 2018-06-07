var http = require('http');

//引入url模块
var url = require('url');


http.createServer((request,response)=>{

    response.writeHead(200,{'ContentType':'text/html;charset=utf-8'});

    // 防止重复访问
    if(request.url !== '/favicon.ico'){

        // 第一个参数是地址，第二个参数是true表示把get传值转换为对象
        var result = url.parse(request.url,true);

        //获取url的get传值
        console.log(result.query.cid);
    }
    
    response.end();

}).listen(8000);

console.log('server running at 127.0.0.1:8000');