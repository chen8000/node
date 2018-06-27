
const router = require('koa-router')();
const DB = require('../../module/db');
const tools = require('../../module/tools');
const dbName = 'articlecate';



router.get('/', async (ctx) => {

    await ctx.render(`admin/articlecate/list`);
});
router.get('/list', async (ctx) => {

    let result = tools.D2(await DB.find(dbName, {}));

    await ctx.render(`admin/articlecate/list`, { result });
});

// 列表
router.get('/edit', async (ctx) => {

    await ctx.render(`admin/articlecate/edit`);
});

// 增加
router.get('/add', async (ctx) => {

    let result = await DB.find(dbName, {"pid":'0'});

    await ctx.render(`admin/articlecate/add`, { result });
});
// 增加提交
router.post('/doAdd', async (ctx) => {

    let result = ctx.request.body;

    // 存数据
    await DB.insert(dbName, result);

    await ctx.redirect(`${ctx.state.__HOST__}/admin/articlecate/list`);
})

// 删除
router.get('/remove', async (ctx) => {

    ctx.body = 'remove';
})




module.exports = router.routes();











