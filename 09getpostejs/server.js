const http = require('http');
const url = require('url');
const ejs = require('ejs');
const router = require('../module/router');//静态路由模块（自定义）

http.createServer((request, response) => {

    response.writeHead(200,{'ContentType':'text/html;charset=utf-8'});

    //获取get还是post
    let reqMethod = request.method.toLowerCase();

    let pathname = url.parse(request.url).pathname;

    switch(pathname){
        case '/':

            ejs.renderFile('views/index.ejs', {}, (err, data) => {

                response.end(data);

            });

        return;

        case '/login':

            //模拟数据
            let data = '我是从后台数据库里查出来的数据';

            var passData = {
                h:'<h2>这个是一个h2标签</h2>',
                msg:data,
                list:[
                    {
                        name:'zhenghui.chen',
                        age:'18',
                        happy:'666'
                    },
                    {
                        name:'zhenghui.chen',
                        age:'18',
                        happy:'666'
                    },
                    {
                        name:'zhenghui.chen',
                        age:'18',
                        happy:'666'
                    },
                    {
                        name:'zhenghui.chen',
                        age:'18',
                        happy:'666'
                    }
                ]
            }


            //第一个参数 要渲染的模版
            //第二个参数 要渲染的数据
            //第三个参数 回调函数
            ejs.renderFile('views/login.ejs',passData,(err, data) => {

                response.end(data);

            });
        return; 

        case '/dologin':
        
            ejs.renderFile('views/dologin.ejs', {}, (err, data) => {

                switch(reqMethod){
                    case 'get' :

                        //get传值，打印到控制台
                        console.log(url.parse(request.url,true).query);
                        //向前台输出页面
                        response.end(data);

                    return;
                    case 'post' :
                        
                        let result = '';
                        //每次拿到数据触发
                        request.on('data', (data) => {
                            result += data;
                        });
                        //数据拿完后触发
                        request.on('end', (err) => {
                            
                            //拿到数据，并输出到前端页面上
                            response.end(result);

                        });
                        

                    return;
                }
                

            });

        return;

        default :
            
            response.writeHead(404,{'ContentType':'text/html;charset=utf-8'});

            ejs.renderFile('views/404.ejs', {}, (err, data) => {

                response.end(data);
            });
        return;


    }

    
    


}).listen(8000);

console.log('server running at 127.0.0.1:8000');


