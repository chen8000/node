

const Koa = require('koa');
const router = require('koa-router')();
const render = require('koa-art-template');
const static = require('koa-static');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const db = require('./module/db');
const app = new Koa();
const dbName = 'user';

//配置 koa-art-template
render(app, {
    root : path.join(__dirname, 'views'), // 视图引擎的位置
    extname : '.html',  // 后缀名
    debug : process.env.NODE_ENV !== 'production'  // 是否开启调试模式
});
app.use(bodyParser()); //配置中间件

//拿 post数据  ctx.request.body

// 配置静态资源
app.use(static(__dirname + '/public'));


router.get('/', async (ctx) => {

    //查数据
    let result = await db.find(dbName, {});
    
    //渲染模版
    await ctx.render('index', {result});

});

//修改模版
router.get('/edit', async (ctx) => {

    // console.log(ctx.query.id)


    let result = await db.find(dbName, {'_id':db.ObjectID(ctx.query.id)});
    

    await ctx.render('edit', {result});
});

//提交修改
router.post('/doEdit', async (ctx) => {
    
    let result = ctx.request.body;

    let data = await db.update(dbName, {'_id':db.ObjectID(result.id)}, result)

    try{
        if(data.result.ok){
            ctx.redirect('/');
        }
    }catch(err){
        console.log(err);
        ctx.redirect('/edit');
        return;
    }
})

//增加
router.get('/add', async (ctx) => {

    await ctx.render('add');
});

//提交增加
router.post('/doAdd', async (ctx) => {

    let result = ctx.request.body;

    //增加数据
    let data = await db.insert(dbName, result);

    try{
        if(data.result.ok){
            //增加完数据后显示index页面
            ctx.redirect('/');
        }
    }catch(err){
        console.log(err);
        ctx.redirect('/add');
        return;
    }

    
});

//删除
router.get('/delete', async (ctx) => {

    let result = ctx.query.id;


    let data = await db.remove(dbName, {"_id":db.ObjectID(result)});

    try{
        if(data.result.ok){
            ctx.redirect('/')
        }
    }catch(err){
        console.log(err);
        ctx.redirect('/');
        return;
    }
})



//启动路由
app
    .use(router.routes()) // 启动路由
    .use(router.allowedMethods()); //  根据上下文环境配置 response 响应头

app.listen(8000);









