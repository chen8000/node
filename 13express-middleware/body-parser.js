
const express = require('express');
const app = express();
app.listen(8000,'127.0.0.1');

//引入中间件 body-parser
const bodyParser = require('body-parser');

//配置bodyParser中间件
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

//要用ejs需要提前配置
app.set('view engine', 'ejs');

app.get('/', (request, response) => {

    response.send('hello bodyParser');
});

//渲染模版
app.get('/login', (request, response) => {
    response.render('login');
});

//通过中间件 response.body 拿到post数据
app.post('/dologin', (request, response) => {
    response.send(request.body)
})



