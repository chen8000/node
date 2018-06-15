

// post 提交数据
const Koa = require('koa');
const router = require('koa-router')();
const views = require('koa-views');

const app = new Koa();

//应用ejs模版
app.use(views('views', { extension : 'ejs' }));





// 启动路由
app
    .use(router.routes()) // 启动路由
    .use(router.allowedMethods()); //  根据上下文环境配置 response 响应头


app.listen(8000);









