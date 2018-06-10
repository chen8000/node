
const express = require('express');
const app = express();
app.listen(8000,'127.0.0.1');

const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/', (request, response) => {

    //在首页获取cookie
    console.log(request.cookies);


    response.send('hello cookieParser');
})

//设置cookie 
app.get('/set', (request, response) => {

    //参数一 cookie的名字
    //参数二 cookie的值
    //参数三 cookie的一些设置信息

    //maxAge 表示过期时间
    response.cookie('username','zhanghui.chen---666',{maxAge:600000});

    response.send('设置cookie成功');

})