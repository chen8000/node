

const router = require('koa-router')();



router.get('/', async (ctx) => {

    await ctx.render('admin/user/list');
});

router.get('/add', async (ctx) => {

    await ctx.render('admin/user/add');
})
router.get('/list', async (ctx) => {

    await ctx.render('admin/user/list');
})



module.exports = router.routes();










