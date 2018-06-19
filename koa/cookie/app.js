

// koa 中使用 cookie

const Koa = require('koa');
const router = require('koa-router')();
const path = require('path');
const app = new Koa();
const render = require('koa-art-template');

//配置 koa-art-template
render(app, {
    root : path.join(__dirname, 'views'), // 视图引擎的位置
    extname : '.html',  // 后缀名
    debug : process.env.NODE_ENV !== 'production'  // 是否开启调试模式
});


router.get('/', async (ctx) => {

    // 设置中文 cookie
    // 把中文转为base64编码格式
    let x = new Buffer('中文').toString('base64');

    // 把base64编码格式转为中文
    let y = new Buffer(x, 'base64').toString();

    console.log(y);





    // 设置 cookie
    ctx.cookies.set('userinfo', 'chen', {
        maxAge:900000, // 设置过期时间
        expires:'2018-09-01', // 设置具体过期日期
        path : '/news', // 表示cookie只能在news下访问
        httpOnly : true , // true 表示这个cookie只有服务器端可以访问  ， false表示客户端也可以访问


    });


    let name = 'zhanghui.chen--666'
    await ctx.render('index', {name});
});

router.get('/news', async (ctx) => {

    // 在另一个页面打印cookie -- 获取cookie
    let getcookie = ctx.cookies.get('userinfo');
    console.log(getcookie)



    let name = '666';
    await ctx.render('news', {name});
})



//启动路由
app
    .use(router.routes()) // 启动路由
    .use(router.allowedMethods()); //  根据上下文环境配置 response 响应头


app.listen(8000);
















