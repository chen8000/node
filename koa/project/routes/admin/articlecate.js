
const router = require('koa-router')();
const DB = require('../../module/db');
const tools = require('../../module/tools');
const dbName = 'articlecate';


// list
router.get('/', async (ctx) => {

    await ctx.render(`admin/articlecate/list`);
});

// list
router.get('/list', async (ctx) => {

    let result = tools.D2(await DB.find(dbName, [{}]));

    await ctx.render(`admin/articlecate/list`, { result });
});

// 编辑
router.get('/edit', async (ctx) => {
    // 一级
    let result0 = [];
    // 当前条数据
    let result1 = await DB.find(dbName, [{"_id":await DB.ObjectID(ctx.query.id)}]);

    // 判断是不是一级  如果是 什么都不做，不是把所有一级都查出来
    // 去掉判断条件可以实现一级变二级，
    if(!result1[0].pid == '0'){
        // 一级
        result0 = await DB.find(dbName, [{"pid":'0'}]);
    }

    
    
    await ctx.render(`admin/articlecate/edit`, { result0, result1 });
});

// 编辑提交地址
router.post('/doEdit', async (ctx) => {

    let result = ctx.request.body;
    let id = result.id;
    let title = result.title;
    let pid = result.pid;
    let keywords = result.keywords;
    let status = result.status;
    let description = result.description;
    

    await DB.update(dbName, { "_id":await DB.ObjectID(result.id)}, 
        {title, pid, keywords, status, description})

    ctx.redirect(`${ctx.state.__HOST__}/admin/articlecate/list`)
})




// 增加
router.get('/add', async (ctx) => {

    let result = await DB.find(dbName, [{"pid":'0'}]);
    
    await ctx.render(`admin/articlecate/add`, { result }); 
});
// 增加提交
router.post('/doAdd', async (ctx) => {

    let result = ctx.request.body;
    let title = result.title;
    let pid = result.pid;
    let keywords = result.keywords;
    let status = result.status;
    let description = result.description;
    
    // 存数据
    await DB.insert(dbName, { title, pid, keywords, status, description});

    await ctx.redirect(`${ctx.state.__HOST__}/admin/articlecate/list`);
})



// 删除
router.get('/remove', async (ctx) => {

    await DB.remove(dbName, {"_id": await DB.ObjectID(ctx.query.id)});

    await ctx.redirect(ctx.state.G.prevPage);
})




module.exports = router.routes();











