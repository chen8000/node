


// 静态资源托管
const Koa = require('koa');
const router = require('koa-router')();
const views = require('koa-views');

// 引入koa-static模块
const static = require('koa-static');

const app = new Koa();


app.use(views('views', {extension:'ejs'}));


//配置中间件   从static目录下找静态资源，
app.use(static('./static'))




router.get('/', async (ctx) => {

    await ctx.render('index');
});




app.use(router.routes());// 启动路由
app.use(router.allowedMethods()); //  根据上下文环境配置 response 响应头


app.listen(8000);











