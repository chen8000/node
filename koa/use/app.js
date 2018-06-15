



// 中间件
const Koa = require('koa');
const router = require('koa-router')();

const app = new Koa();


//应用级中间件
//可以写两个参数，可以写一个参数
//两个参数表示匹配某个路由，一个参数表示匹配所有路由
//表示匹配所有路由   next参数表示继续向下匹配
app.use( async (ctx, next) => {

    console.log(new Date());

    await next();
});



// 路由级中间件
// 匹配完第一个news后打印一句话，完了调用next()方法继续往下执行

router.get('/news', async (ctx, next) => {

    console.log('路由级中间件1');

    await next();

});

router.get('/news', async (ctx) => {

    ctx.body = '路由级中间件2';
});


//错误处理中间件
//先执行中间件路由，然后向下匹配，然后执行中间件里的错误处理语句
app.use( async (ctx, next) => {

    console.log('错误处理中间件');

    await next();

    //如果没有匹配到路由会执行这里
    if(ctx.status == 404){

        ctx.status = 404;

        ctx.body = '这是一个404页面';

    }
})






router.get('/', async (ctx) => {
    
    ctx.body = '这个一个路由'
});




//启动路由
app
    .use(router.routes()) // 启动路由
    .use(router.allowedMethods()); //  根据上下文环境配置 response 响应头


app.listen(8000);






