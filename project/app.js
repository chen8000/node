

// zhanghui.chen -- 666


const express = require('express');
const app = express();

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
app.use(bodyParser.json())



app.get('/', (request, response) => {

    response.send('首页');
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
            if(data.length >0 ){
                console.log('登陆成功');
            }else{
                console.log('登陆失败');
            }

            db.close();
        })
    })

    // 

    response.send();
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
})




app.listen(8000,'127.0.0.1');








