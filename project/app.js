

// zhanghui.chen -- 666


const express = require('express');
const app = express();


//使用ejs模版引擎
app.set('view engine', 'ejs');

app.use(express.static('static'));



app.get('/', (request, response) => {

    response.send('index');
});


// 用户登陆的路由
app.get('/login', (request, response) => {

    response.render('login');

    // response.send('login--用 户登陆');
});


//商品列表
app.get('/product', (request, response) => {

    response.send('product--商品列表')
});



//增加商品列表
app.get('/productadd', (request, response) => {

    response.send('productAdd--增加商品列表');
});


//编辑商品
app.get('/productedit', (request, response) => {

    response.send('productedit--编辑商品');
});


//删除商品
app.get('/productdelete', (request, response) => {

    response.send('productdelete--删除商品')
})

















app.listen(8000,'127.0.0.1');