
const router = require('koa-router')();
const DB = require('../../module/db');
const dbName = 'nav';


// 首页
router.get('/', async (ctx) => {

    ctx.body = 'nav';
});
//列表
router.get('/list', async (ctx) => {

    let result = await DB.find(dbName, [{}, {}, {"sort":-1}]);

    ctx.render('admin/nav/list', { result });

    
});

// 增加
router.get('/add', async (ctx) => {

    ctx.render('admin/nav/add');
})

// 增加提交
router.post('/doAdd', async (ctx) => {

    let result = ctx.request.body;
    let title = result.title;
    let url = result.url;
    let status = result.status;
    let sort = await DB.count(dbName, {});

    let json = {title, url, status, sort};

    await DB.insert(dbName, json);

    ctx.redirect(`${ctx.state.__HOST__}/admin/nav/list`);
})

// 编辑
router.get('/edit', async (ctx) => {

    let id = ctx.query.id;

    let result = await DB.find(dbName, [{"_id": await DB.ObjectID(id)}]);

    let prevPage = ctx.state.G.prevPage;

    ctx.render('admin/nav/edit', { result, prevPage });
    
})

// 编辑提交
router.post('/doEdit', async (ctx) => {

    let result = ctx.request.body;

    await DB.update(dbName, {"_id":await DB.ObjectID(result.id)}, result);

    ctx.redirect(result.prevPage);

});

// 排序
router.post('/editSort', async (ctx) => {

    let result = ctx.request.body;
    let id = result.id;
    let sort = result.sort;

    let type = await DB.update(dbName, {"_id": await DB.ObjectID(id)}, {"sort": Number(sort)});

    if(type){
        ctx.body = {"type":true};
    }else{
        ctx.body = {"type":false};
    }

});

// 删除
router.get('/remove', async (ctx) => {

    let id = ctx.query.id;

    await DB.remove(dbName, {"_id":await DB.ObjectID(id)});

    ctx.redirect(ctx.state.G.prevPage);
})





module.exports = router.routes();


