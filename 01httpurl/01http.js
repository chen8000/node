
//引入http 模块
var http = require('http');


/*
    createServer后面的匿名函数的参数  
    request 获取url信息
    response 浏览器返回响应信息
*/
http.createServer(function (request,response) {

    //设置响应头，
    //200 : ok  
    //文件类型 : html
    //字符编码 : utf-8
    response.writeHead(200,{'ContentType':'text/html;charset=utf-8'});

    // if(request.url !== 'favicon.ico'){
        console.log('访问');
    // }
    
    //往页面输出内容
    response.write('zhanghui.chen');

    //结束响应
    response.end();

}).listen(8000);
console.log('server running at 127.0.0.1:8000')