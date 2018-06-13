

// zhanghui.chen -- 666


const express = require('express');
const app = express();
const session = require('express-session');

//获取post提交的数据
const bodyParser = require('body-parser');

//链接数据库
const mongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017/productmanage';


//使用ejs模版引擎
app.set('view engine', 'ejs');

//配置中间件
app.use(express.static('static'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

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


//自定义中间件，判断用户是否登陆
app.use((request, response, next) => {

    if(request.url == "/login" || request.url == '/doLogin'){
        
        next();
    }else{
        //判断有没有登陆
        
        if(request.session.userInfo && request.session.userInfo.username !== ''){
            
            //设置全局数据
            app.locals['userinfo'] = request.session.userInfo;
            
            next();
        }else{
            response.redirect('/login');
        }
    } 
});



// 用户登陆的路由
app.get('/login', (request, response) => {

    response.render('login');

    // response.send('login--用 户登陆');
});

// doLogin  获取登陆提交的数据
app.post('/doLogin', (request, response) => {

    //1. 获取数据
    // let getPost = request.body;


    // 链接数据库
    mongoClient.connect(dbUrl, (err, db) => {

        if(err){
            console.log(err);
            return;
        }

        //查询数据
        let result = db.collection('user').find(request.body);

        //toArray来拿查出来的数据
        result.toArray((err, data) => {
            if(err){
                console.log(err);
                return;
            }
            if( data.length > 0 ){
                console.log('登陆成功');

                //登陆成功后保存用户信息
                request.session.userInfo = data[0];
                //跳转页面
                response.redirect('/product');
                
                
            }else{
                console.log('登陆失败');

                response.send(`<script>alert('登陆失败'); location.href='/login'</script>`);
            }
            db.close();
        })
    });
});


//商品列表
app.get('/product', (request, response) => {

    response.render('product');

    // response.send('product--商品列表')
});



//增加商品列表
app.get('/productadd', (request, response) => {

    response.render('productadd')

    // response.send('productAdd--增加商品列表');
});


//编辑商品
app.get('/productedit', (request, response) => {

    response.render('productedit');

    // response.send('productedit--编辑商品');
});


//删除商品
app.get('/productdelete', (request, response) => {

    response.render('productdelete')

    // response.send('productdelete--删除商品')
});

//退出登陆
app.get('/loginOut', (request, response) => {
    
    request.session.destroy((err) => {
        if(err){
            console.log(err);
        }
        response.redirect('/login');
    });
});

app.listen(8000,'127.0.0.1');








