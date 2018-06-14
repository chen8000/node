

const Koa = require('koa');
const Router = require('koa-router');


const app = new Koa();
const router = new Router();

//配置路由


// ctx  // context  上下文的意思 包含了request, response
router.get('/', async (ctx) => {

    ctx.body = '返回的数据';

}).get('/news', async (ctx) => {
    
    ctx.body = '这是一个新闻页面'; 
});



//启动路由
app 
    .use(router.routes()) // 启动路由
    .use(router.allowedMethods()); //  根据上下文环境配置 response 响应头



app.listen(8000);






















