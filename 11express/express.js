const express = require('express');
const app = new express();



//监听 8000 端口
app.listen(8000, '127.0.0.1');


//配置路由
app.get('/', (request, response) => {

    //往页面输入一句话
    response.send('你好，express')
});
 
// 路由动态传值
app.get('/newscontent/:aid', (request, response) => {

    let aid = request.params.aid;
    
    response.send('newscontent模块---'+aid);
});

//路由get传值
app.get('/product', (request, response) => {

    //获取get传值
    let getquery = request.query;

    console.log(getquery)

    response.send('product---' + getquery.name);
})
