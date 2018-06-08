
const http = require('http');

const fs = require('fs');

http.createServer((request, response) => {
    

    if(request.url !== '/favicon.ico'){
        console.log('访问');

        let getName = request.url;
        
        // 如果没有输入.html的请求，则返回index.html
        if(getName == '/'){
            fs.readFile('static/index.html', (err, stats) => {
                if(err){
                    console.log(err);
                    return;
                }

                //这三个要一起写
                //设置请求头
                response.writeHead(200, {'ContentType':'text/html;charset=utf-8'});
                //写入内容
                response.write(stats);
                //结束响应
                response.end();
            });
        }else{


            //输入了内容.html的请求
            fs.readFile('static/' + getName, (err,stats) => {

                //如果读取失败
                if(err){
                    
                    fs.readFile('static/404.html', (err,stats) => {
                        if(err){
                            console.log('读取404文件失败');
                            return;
                        }
                        
                        response.writeHead(200, {'ContentType':'text/html;charset=utf-8'});
                        response.write(stats);
                        response.end();

                    })
                    
                    return;
                }

                response.writeHead(200, {'ContentType':'text/html;charset=utf-8'});
                response.write(stats);
                response.end();

            });

        }

    }

    
}).listen(8000);

console.log('server running at 127.0.0.1:8000');