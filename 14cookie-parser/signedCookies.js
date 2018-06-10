const express = require('express');
const app = express();
app.listen(8000,'127.0.0.1');

const CookieParser = require('cookie-parser');

// 1.  123456表示随机加密的字符传
// app.use(CookieParser('123456'));

//2. 设置cookie
//response.cookie('username','signedCookies',{ maxAge: 900000, signed: true });

//3. 使用
// request.signedCookies




//配置cookieParser
app.use(CookieParser('123456'));

// signed --为true时对cookie进行加密，客户端是看不到的

app.get('/', (request, response) => {

    //获取经过加密的cookies
    console.log(request.signedCookies);

    response.send('首页');
});

app.get('/set', (request, response) => {

    //存储cookies 并设置为客户端看不到，只有在服务器端能获取到cookie
    response.cookie('username','signedCookies',{ maxAge: 900000, signed: true });

    response.send('设置cookies成功');
});



