


//负载均衡

/*
1. const mongoStore = require('connect-mongo')(session);
2.配置中间件
【【 其他的中间件同 session 的一样 】】

    store : new MongoStore({
        url:'mongodb://127.0.0.1:27017/student'  //数据库的地址
    })


*/ 




const express = require('express');
const app = express();
app.listen(8000,'127.0.0.1');

const session = require('express-session');

// 使用connect-mongo把session数据存到mongodb数据库里 ，需要把 session传进去
const mongoStore = require('connect-mongo')(session);

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

    rolling:true, // 每次用户刷新也就后重新设置cookie时间，只要用户在过期时间内刷新的页面，
                // cookie就不会过期，过期时间从用户最后一次刷新开始计算
    store : new MongoStore({
        url:'mongodb://127.0.0.1:27017/student'
    })            
}));

app.get('/', (request, response) => {

    if(request.session.username){
        response.send(`用户：${request.session.username} 已登陆`);
    }else{
        response.send(`没有用户登陆`);
    }

    
});

app.get('/login', (request, response) => {

    request.session.username = 'zhanghui.chen';

    response.send('设置session成功');
});

app.get('/loginOut', (request,  response) => {

    // request.session.cookie.maxAge = 0;

    request.session.destroy((err) => {

        if(err){
            console.log(err)
        }
    })

    response.send('销毁session')
});







