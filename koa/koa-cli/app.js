


const koa = require('koa');
const router = require('koa-router')();
const app = new koa();

// 子路由模块 -admin
const admin = require('./routes/admin');
const web = require('./routes/web');
const api = require('./routes/api');

//配置路由

//前台首页
router.use('/', web.routes());

//后台首页
router.use('/admin', admin.routes());

//api
router.use('/api', api.routes());




//启动路由
app
    .use(router.routes()) // 启动路由
    .use(router.allowedMethods()); //  根据上下文环境配置 response 响应头


app.listen(8000);






