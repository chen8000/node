

const Koa = require('koa');
const router = require('koa-router')();

const app = new Koa();


router.get('/get', async (ctx) => {

    //获取get传值一
    console.log(ctx.query);

    // 获取get传值二
    console.log(ctx.querystring);

    //获取get传值三
    console.log(ctx.request.query);

    //获取get传值四
    console.log(ctx.request.querystring);

    ctx.body = 'get传值'

});



// 启动路由
app
    .use(router.routes()) // 启动路由
    .use(router.allowedMethods()); //  根据上下文环境配置 response 响应头


app.listen(8000);






