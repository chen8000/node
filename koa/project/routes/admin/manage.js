
const router = require('koa-router')();
const DB = require('../../module/db');
const tools = require('../../module/tools');
const dbName = 'admin';

router.get('/', async (ctx) => {

    ctx.redirect(ctx.state.__HOST__ + '/admin/manage/list')
})

// 查
router.get('/list', async (ctx) => {

    let list = await DB.find(dbName, [{}]);

    ctx.render('admin/manage/list',{list});
})


// 增加
router.get('/add', async (ctx) => {

    ctx.render('admin/manage/add');
})
// 增加提交地址
router.post('/doAdd', async (ctx) => {

    //接收提交过来的数据
    let result = await ctx.request.body;

    // 查找是否有这个用户名
    let findName = await DB.find(dbName, [{"username":result.username}]);
    
    // 如果用户存在
    if(findName.length > 0){

        console.log(`用户名已存在`);
    
        await ctx.redirect(`${ctx.state.__HOST__}/admin/manage/add`);

        return;
    }  
    

    // 添加管理员信息
    await DB.insert(
        dbName, 
        {
            'username':result.username, 
            'password': await tools.md5(result.password),
            'status':1,
            'last_time':''
        });

    await ctx.redirect(`${ctx.state.__HOST__}/admin/manage/list`)
})

// 改
router.get('/edit', async (ctx) => {

    let id = ctx.query.id;

    let result = await DB.find(dbName, [{"_id":await DB.ObjectID(id)}]);

    await ctx.render(`admin/manage/edit`, {result});

});
//修改提交地址
router.post('/doEdit', async (ctx) => {

    //获取post传值
    let result = ctx.request.body;

    // 去数据库修改数据
    await DB.update(
        dbName, 
        {'_id':DB.ObjectID(result.id)},
        {'username':result.username, 'password':tools.md5(result.password)}
    );


    await ctx.redirect(`${ctx.state.__HOST__}/admin/manage/list`);

})


// 删
router.get('/remove', async (ctx) => {

    let id = ctx.query.id;

    // 删除
    await DB.remove(dbName, {"_id":DB.ObjectID(id)});


    await ctx.redirect(`${ctx.state.__HOST__}/admin/manage/list`);
    
})







module.exports = router.routes();















