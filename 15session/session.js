


//express-session
// session 没有过期时间，浏览器关闭后就会消失 

const express = require('express');
const app = express();
const session = require('express-session');

app.listen(8000,'127.0.0.1');

let sessingTime = 5000;


//配置session的中间件
app.use(session({
    secret:'zhanghui666', // 加密session的随机字符串，随便写
    name:'userId', // 设置返回客户端的key 默认是connect.sid   
    resave:false, // 默认为true 表示不管session有没有变化都保存，false表示有变化才保存
    saveUninitialized:true, // 强制把未初始化的session存储 默认设置为true 建议设置成true

    //cookie的所有参数都可以设置到这里 
    cookie:{
        secure:false,
        maxAge:sessingTime  //设置过期时间
    }, //secure:true 表示只有在https协议下才可以访问这个cookie

    rolling:true // 每次用户刷新也就后重新设置cookie时间，只要用户在过期时间内刷新的页面，
                // cookie就不会过期，过期时间从用户最后一次刷新开始计算
}))






app.get('/', (request, response) => {

    if(request.session.userInfo){

        response.send('hello ' + request.session.userInfo);
    }else{
        response.send('没有用户登陆');
    }


    
});

app.get('/login', (request, response) => {

    request.session.userInfo = 'zhanghui.chen 666';

    response.send('设置session');
});

app.get('/dologin', (request, response) => {

    if(request.session.userInfo){

        response.send('hello ' + request.session.userInfo);
    }else{
        response.send('没有用户登陆');
    }
});



