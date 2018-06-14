
const express = require('express');
const app = express();
const session = require('express-session');
// const router = express.Router();

const admin = require('./modules/routes/admin/admin');
const index = require('./modules/routes/index/index');


//使用ejs模版引擎
app.set('view engine', 'ejs');

//配置中间件
app.use(express.static('static'));
app.use('/upload',express.static('upload'));

//配置session的中间件
app.use(session({
    secret:'zhanghui666', // 加密session的随机字符串，随便写
    name:'userId', // 设置返回客户端的key 默认是connect.sid   
    resave:false, // 默认为true 表示不管session有没有变化都保存，false表示有变化才保存
    saveUninitialized:true, // 强制把未初始化的session存储 默认设置为true 建议设置成true

    //cookie的所有参数都可以设置到这里 
    cookie:{
        secure:false,
        maxAge:1000*60*30  //设置过期时间
    }, //secure:true 表示只有在https协议下才可以访问这个cookie

    rolling:true, // 每次用户刷新也就后重新设置cookie时间，只要用户在过期时间内刷新的页面，
                // cookie就不会过期，过期时间从用户最后一次刷新开始计算

    //把 session存储到数据库             
    // store : new MongoStore({
        // url:'mongodb://127.0.0.1:27017/student',
        // touchAfter: 24 * 3600   // 这个熟悉表示在24小时内无论有多少次请求，数据是不会变的，除非你更改了这个数据
    // })            
}));

// 配置中间件，加载对应的路由
app.use('/', index);
app.use('/admin', admin);

app.listen(8000, '127.0.0.1');








