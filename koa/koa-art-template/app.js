


// art-template    腾讯开发的

const Koa = require('koa');
const router = require('koa-router')();

const app = new Koa();





router.get('/', async (ctx) => {

    ctx.body = '首页';
});

router.get('/news', async (ctx) => {
    
    ctx.body = '新闻';
})


//启动路由
app
    .use(router.routes()) // 启动路由
    .use(router.allowedMethods()); //  根据上下文环境配置 response 响应头

app.listen(8000);
















