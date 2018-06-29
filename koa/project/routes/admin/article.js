

const router = require('koa-router')();
const DB = require('../../module/db');



router.get('/list', async (ctx) => {

    // page 第几页  pageSize:每页显示多少条， 默认10条

    let result = await DB.find('user', [{}], { page : 1, pageSize: 10});

    ctx.render('admin/article/list', {result});
});

router.get('/add', async (ctx) => {

    ctx.body = '--- add';
})



module.exports = router.routes();












