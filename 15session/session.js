


//express-session
// session 没有过期时间，浏览器关闭后就会消失 

/*
    //销毁 session
    request.session.destroy((err) => {

    });

    //设置 session
    request.session.username = 'zhanghui666'

    //获取 session
    request.session.username

    //重新设置cookie的过期时间
    request.session.cookie.maxAge=5000 

*/

const express = require('express');
const app = express();
const session = require('express-session');

app.listen(8000,'127.0.0.1');


//配置session的中间件
app.use(session({
    secret:'zhanghui666', // 加密session的随机字符串，随便写
    name:'userId', // 设置返回客户端的key 默认是connect.sid   
    resave:false, // 默认为true 表示不管session有没有变化都保存，false表示有变化才保存
    saveUninitialized:true, // 强制把未初始化的session存储 默认设置为true 建议设置成true

    //cookie的所有参数都可以设置到这里 
    cookie:{
        secure:false,
        maxAge:50000000  //设置过期时间
    }, //secure:true 表示只有在https协议下才可以访问这个cookie

    rolling:true // 每次用户刷新也就后重新设置cookie时间，只要用户在过期时间内刷新的页面，
                // cookie就不会过期，过期时间从用户最后一次刷新开始计算
}));


//销毁 session
app.get('/loginOut', (request, response) => {

    //设置session为0 起到销毁session的作用
    // request.session.cookie.maxAge = 0;

    //调用销毁session的方法来销毁session
    request.session.destroy((err) => {
        if(err){
            console.log(err);
        }
    });

    response.send('退出登陆成功！');

});



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



