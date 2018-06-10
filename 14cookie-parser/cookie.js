
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
    response.cookie('username','zhanghui.chen---666',{maxAge:600000,path:'/news'});

    response.send('设置cookie成功');

});

app.get('/news', (request, response) => {
    console.log(request.cookies);
    response.send('获取cookies成功');
})

//cookie的一些设置参数
//都写到第三个参数的打括号里
/*
domain --设置域名访问cookie  
{domain:'.aaa.com'}
    -- 表示 www.aaa.com 可以访问cookie news.aaa.com 也可以访问cookie (多个二级域名共享这个cookie)
{domain:'www.aaa.com'}
    -- 表示 只有www.aaa.com 可以访问到这个cookie
    
maxAge  --设置过期时间
secure  --值为 true 时 在 http 协议中是无效的，在 https 中才有效  默认为false
path --设置只有在指定目录下才有效  {path:'/news'} 表示只有在news目录下才能访问到cookie  
httpOnly --（服务器端可以设置cookie，客户端不可以设置cookie）微软对cookie做的拓展，如果设置为true时，通过 js applet等将无法获取到cookie,防止xss攻击产生。


signed --为true时对cookie进行加密，客户端是看不到的

*/



















