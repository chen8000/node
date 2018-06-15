

const Koa = require('koa');
const router = require('koa-router')();
const views = require('koa-views');

const app = new Koa();


//配置第三方中间件
// 以.html结尾的模版引擎
// app.use(views('views', { map : { html : 'ejs'}}));
// 从views里找模版， 使用ejs模版引擎  以 .ejs 结尾
app.use(views('views', { extension:'ejs' }));

router.get('/', async (ctx) => {

    let title = 'zhanghui.chen 666';

    await ctx.render('index',{ title }); 
});



router.get('/news', async (ctx) => {

    let arr = ['11111', '22222', '333333'];

    await ctx.render('news', { arr });
})







//启动路由
app
    .use(router.routes()) // 启动路由
    .use(router.allowedMethods()); //  根据上下文环境配置 response 响应头



app.listen(8000);















