


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


//路由中间件
/*
    写两个 news 路由，先匹配到第一个 news 路由，
    然后做一些工作，做完后，
    调用next()方法，
    再向下继续执行下一个路由
*/
app.get('/news', (request, response, next) => {
    
    console.log('这个是路由中间件');
    
    next();

});
app.get('/news', (request, response) => {
    response.send('真正的news路由')
})




