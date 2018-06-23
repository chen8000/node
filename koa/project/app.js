


const koa = require('koa');
const router = require('koa-router')();
const static = require('koa-static');
const path = require('path');
const app = new koa();
const render = require('koa-art-template');

// 子路由模块 -admin
const index = require('./routes/index');
const admin = require('./routes/admin');
const api = require('./routes/api');

//配置中间件
render(app, {
    root : path.join(__dirname, 'views'), // 视图引擎的位置
    extname : '.html',  // 后缀名
    debug : process.env.NODE_ENV !== 'production'  // 是否开启调试模式
});

// 配置静态资源
app.use(static(__dirname + '/public'));



// 配置全局路径
router.use( async (ctx, next) => {

    // ctx.request.header.host;

    // 配置全局路径  host
    ctx.state.__HOST__ = `http://${ctx.request.header.host}`;

    next();
})


//后台首页
router.use('/admin', admin);

//api
router.use('/api', api);

//前台首页  默认加载index
router.use(index);



//启动路由
app
    .use(router.routes()) // 启动路由
    .use(router.allowedMethods()); //  根据上下文环境配置 response 响应头


app.listen(8000);






