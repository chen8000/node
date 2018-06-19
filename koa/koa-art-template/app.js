


// art-template    腾讯开发的

const Koa = require('koa');
const router = require('koa-router')();
const render = require('koa-art-template');
const path = require('path');

const app = new Koa();

//配置 koa-art-template
render(app, {
    root : path.join(__dirname, 'views'), // 视图引擎的位置
    extname : '.html',  // 后缀名
    debug : process.env.NODE_ENV !== 'production'  // 是否开启调试模式
});





router.get('/', async (ctx) => {

    let list = 111;
    let h = `<h2>这是一个h2标签</h2>`;

    await ctx.render('index', {list, h});
});

router.get('/news', async (ctx) => {

    let list = 222;
    let h = `<h2>这是一个h2标签</h2>`;
    
    await ctx.render('news', {list, h});
})


//启动路由
app
    .use(router.routes()) // 启动路由
    .use(router.allowedMethods()); //  根据上下文环境配置 response 响应头

app.listen(8000);
















