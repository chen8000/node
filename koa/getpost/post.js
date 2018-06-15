

// post 提交数据
const Koa = require('koa');
const router = require('koa-router')();
const views = require('koa-views');

//使用koa-bodyparser模块获取post提交数据
const bodyParser = require('koa-bodyparser');

const app = new Koa();

//应用ejs模版
app.use(views('views', { extension : 'ejs' }));
app.use(bodyParser()); //配置中间件


router.get('/', async (ctx) => {

    await ctx.render('index');
})

//接收post提交过来的数据
router.post('/doAdd', async (ctx) => {

    //拿到post提交的数据
    console.log(ctx.request.body)

    ctx.body = ctx.request.body;
    
})






app.use(router.routes());// 启动路由
app.use(router.allowedMethods()); //  根据上下文环境配置 response 响应头


app.listen(8000);









