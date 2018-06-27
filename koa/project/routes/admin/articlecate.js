
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

    let result = tools.D2(await DB.find(dbName, {}));

    await ctx.render(`admin/articlecate/list`, { result });
});

// 编辑
router.get('/edit', async (ctx) => {
    // 一级
    let result0 = [];
    // 当前条数据
    let result1 = await DB.find(dbName, {"_id":await DB.ObjectID(ctx.query.id)});
    // 默认选中
    let result2 = [];

    // 判断是不是一级  如果是 什么都不做，不是把所有一级都查出来
    if(!result1[0].pid == '0'){
        // 一级
        result0 = await DB.find(dbName, {"pid":'0'});

        for(let i = 0; i<result0.length; i++){
            if(result1[0].pid == result0[i]._id){

                result2.push(result0[i])
            }
        }
    }

    
    
    await ctx.render(`admin/articlecate/edit`, { result0, result1, result2 });
});

// 编辑提交地址
router.post('/doEdit', async (ctx) => {

    let result = ctx.request.body;

    // ctx.body = result;{ title: 'zhanghui.chen',
//   id: '5b333e7853a7f74b3b2c3d4e',
//   pid: '0',
//   keywords: '技术',
//   status: '1',
//   description: 'zhanghui.chen -- 666' }

    await DB.update(dbName, {"_id":await DB.ObjectID(result.id)}, result)

    ctx.redirect(`${ctx.state.__HOST__}/admin/articlecate/list`)
})




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

    await DB.remove(dbName, {"_id": await DB.ObjectID(ctx.query.id)});

    await ctx.redirect(`${ctx.state.__HOST__}/admin/articlecate/list`)
})




module.exports = router.routes();











