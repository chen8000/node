const http = require('http');
const url = require('url');
const ejs = require('ejs');
const router = require('../module/router');//静态路由模块（自定义）

http.createServer((request, response) => {

    response.writeHead(200,{'ContentType':'text/html;charset=utf-8'});

    let pathname = url.parse(request.url).pathname;

    switch(pathname){
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

                //接收get传值
                console.log(url.parse(request.url,true).query);

                response.end(data);

            });

        return;
    }

    
    


}).listen(8000);

console.log('server running at 127.0.0.1:8000');


