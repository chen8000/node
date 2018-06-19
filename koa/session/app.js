


// koa 中使用session 
// cookie 是保存到客户端的  session是保存在服务器端的  session比cookie更安全一些

const Koa = require('koa');
const router = require('koa-router')();
const session = require('koa-session');
const app = new Koa();

// 配置session中间件
app.keys = ['some secret hurr']; // cookie的签名，不用管写上就行

const CONFIG = {
    key : 'koa:sess', // 不需要配置，就这样写就行
    maxAge : 9000000, // 表示一个cookie的过期时间
    overwrite : true, // 不用设置 就用默认 的 true
    httpOnly : true, // true 只有服务器端可以获取这个session false表示客户端和服务器端都可以获取
    signed : true, // 使用默认 true
    rolling : false, // 每次访问都重新设置cookie,这将重新设置过期时间
    renew : true // 每次访问都重新设置cookie,这将重新设置过期时间
};

app.use(session(CONFIG, app));





router.get('/', async (ctx) => {

    // 设置 session  ctx.session.key = value
    ctx.session.username = '张辉666';

    ctx.body = '/////';
});

router.get('/news', async (ctx) => {

    // 获取session  ctx.session.key
    console.log(ctx.session.username);

    ctx.body = 'news';
})




//启动路由
app
    .use(router.routes()) // 启动路由
    .use(router.allowedMethods()); //  根据上下文环境配置 response 响应头



app.listen(8000);









