


//express-session

const express = require('express');
const app = express();
const session = require('express-session');

app.listen(8000,'127.0.0.1');


//配置session的中间件
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false} //secure:true 表示只有在https协议下才可以访问这个cookie
}))






app.get('/', (request, response) => {

    if(request.session.userInfo){

        response.send('有session: ' + request.session.userInfo);
    }else{
        response.send('没有这个session ');
    }


    
});

app.get('/login', (request, response) => {

    request.session.userInfo = 'zhanghui.chen 666';

    response.send('设置session');
});

app.get('/dologin', (request, response) => {

    response.send('dologin');
});



