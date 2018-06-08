
const http = require('http');

//读取文件
const fs = require('fs');

//自定义模块(获取文件的后缀名  path.extname)
const getmime = require('./module/getmime');

//自定义模块  过滤url后面的参数
const filterUrl = require('./module/filterUrl');

http.createServer((request, response) => {
    

    if(request.url !== '/favicon.ico'){
        console.log('访问');

        //拿到过滤后的url（把参数过滤掉）
        let getName = filterUrl(request.url);
        
        // 如果没有输入.html的请求，则返回index.html
        if(getName == '/'){
            getName = 'index.html';
        }

        //拿到截取后的后缀名
        let mimeName = getmime(getName);
        
        
        // let getFilterUrl = ;

        // console.log(getFilterUrl);

        //输入了内容.html的请求
        fs.readFile('static/' + getName, (err,stats) => {

            //如果读取失败
            if(err){
                
                fs.readFile('static/404.html', (err,stats) => {
                    if(err){
                        console.log('读取404文件失败');
                        return;
                    }

                    response.writeHead(404, {'ContentType':'text/'+mimeName+';charset=utf-8'});
                    response.write(stats);
                    response.end();

                })
                
                return;
            }

            //这三个要一起写
            //设置请求头
            response.writeHead(200, {'ContentType':'text/'+mimeName+';charset=utf-8'});
            //写入内容
            response.write(stats);
            //结束响应
            response.end();

        });

    }

    
}).listen(8000);

console.log('server running at 127.0.0.1:8000');