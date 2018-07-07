
const router = require('koa-router')();
const tools = require('../../module/tools');
const DB = require('../../module/db');
const dbName = 'focus';

// 配置图片上传路径
const upload = tools.storage('public/upload');





router.get('/', async (ctx) => {
    await ctx.redirect(`${ctx.state.__HOST__}/admin/focus/list?page=1`);
})



// 列表
router.get('/list', async (ctx) => {

        // page 第几页  pageSize:每页显示多少条， 默认10条
        let page = ctx.query.page; // 第几页
        let pageSize = 5; // 每页显示多少条
        let result = await DB.find(dbName, [{}, {}, {'sort':-1}], { page, pageSize}); // 根据page查询对应数据
    
        let count = await DB.count(dbName, {}); //总数量
        let counts = Math.ceil(count / pageSize);// 需要取整数
    
        await ctx.render('admin/focus/list', { result , page, pageSize, counts});
});

// 增加
router.get('/add', async (ctx) => {

    ctx.render('admin/focus/add');
});

// 增加提交地址
router.post('/doAdd', upload.single('pic'), async (ctx) => {

    // ctx.request.body接收不到数据，要使用ctx.req.body
    let result = await ctx.req.body;

    let title = result.title;
    let url = result.url;
    let status = result.status;

    // 图片
    let pic = ctx.req.file ? ctx.req.file.path.substr(7) : '';

    // 排序
    let sort = await DB.count(dbName, {}); //总数量
    // 把图片添加到result里

    let json = { title, url, status, pic, sort };

    await DB.insert(dbName, json);

    ctx.redirect(`${ctx.state.__HOST__}/admin/focus/list?page=1`);
});

// 编辑
router.get('/edit', async (ctx) => {

    let result = await DB.find(dbName, [{"_id": await DB.ObjectID(ctx.query.id)}]);

    let prevPage = ctx.state.G.prevPage;

    ctx.render('admin/focus/edit', {result, prevPage});
});

router.post('/doEdit', upload.single('pic'), async (ctx) => {

    // ctx.request.body接收不到数据，要使用ctx.req.body
    let result = await ctx.req.body;
    let id = result.id;

    let title = result.title;
    let url = result.url;
    let status = result.status;

    // 图片
    let pic = ctx.req.file ? ctx.req.file.path : '';

    // 排序
    let sort = await DB.count(dbName, {}); //总数量
    // 把图片添加到result里

    let json = { title, url, status, sort };

    if(pic != ''){
        json.pic = pic.substr(7);
    }


    await DB.update(dbName, {"_id": await DB.ObjectID(id)}, json);

    ctx.redirect(result.prevPage);

});

// 排序
router.post('/editSort', async (ctx) => {

    let result = ctx.request.body;

    let updateResult = await DB.update(dbName, {"_id": await DB.ObjectID(result.id)}, {"sort": Number(result.sort)});

    if(updateResult){
        ctx.body = {"type":true};
    }else{
        ctx.body = {"type":false};
    }
});

router.get('/remove', async (ctx) => {

    let id = ctx.query.id;

    await DB.remove(dbName, {"_id":await DB.ObjectID(id)});

    ctx.redirect(ctx.state.G.prevPage);
})



/*
title
pic
url

status


*/ 





module.exports = router.routes();








