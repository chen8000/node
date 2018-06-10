


// express 中间件
/*
匹配路由之前或者匹配路由之后做的一些操作 -- 中间件
*/

const express = require('express');
const app = new express();

app.listen(8000,'127.0.0.1');

/*
中间件
表示匹配任何路由

应用级中间件

next() 表示向下👇执行，继续向下匹配
*/ 

app.use((request, response, next) => {
    
    //打印一个时间
    console.log(new Date());

    next();
})





app.get('/', (request,response) => {


    response.send('zhanghui.chen 666');
});