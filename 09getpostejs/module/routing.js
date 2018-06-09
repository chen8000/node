


const ejs = require('ejs');
const fs = require('fs');
//封装路由模块

let app = {
    //登陆页面
    login: (request, response) => {
        
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
    },
    //登陆成功页面
    dologin: (request, response) => {
        ejs.renderFile('views/dologin.ejs', {}, (err, data) => {
        //获取get还是post
        let reqMethod = request.method.toLowerCase();

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

                        //把拿到的post数据写入到postlogin.txt文件
                        fs.appendFile('postLogin.txt', result + '\n', (err) => {
                            if(err){
                                console.log(err);
                                return;
                            }
                            console.log('写入成功');
                        });
                        
                        //拿到数据,打印到控制台
                        console.log(result);

                        //提示登陆成功
                        response.end('<script>alert("12222")</script>');

                    });
                    

                return;
            }
            

        });
    },
    //什么都不写就导航到index页面
    index: (request, response) => {
        ejs.renderFile('views/index.ejs', {}, (err, data) => {

            response.end(data);

        });
    }
}

module.exports = app;




