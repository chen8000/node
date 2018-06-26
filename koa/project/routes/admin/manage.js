
const router = require('koa-router')();
const DB = require('../../module/db');
const dbName = 'admin';

router.get('/', async (ctx) => {

    ctx.redirect(ctx.state.__HOST__ + '/admin/manage/list')
})

router.get('/add', async (ctx) => {

    ctx.render('admin/manage/add');
})
router.get('/list', async (ctx) => {

    let list = await DB.find(dbName, {});

    ctx.render('admin/manage/list',{list});
})






module.exports = router.routes();















