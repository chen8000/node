


// koa 中使用session 
// cookie 是保存到客户端的  session是保存在服务器端的  session比cookie更安全一些

const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();



router.get('/', async (ctx) => {

    ctx.body = '/////';
});




//启动路由
app
    .use(router.routes()) // 启动路由
    .use(router.allowedMethods()); //  根据上下文环境配置 response 响应头



app.listen(8000);









