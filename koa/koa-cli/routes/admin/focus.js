

//  轮播图模块

const router = require('koa-router')();


router.get('/', async (ctx) => {

    await ctx.render('admin/focus/index');
});

// add  edit  delete

//增加
router.get('/add', async (ctx) => {

    ctx.body = 'add';
});

//编辑
router.get('/edit', async (ctx) => {

    ctx.body = 'edit';
});

//删除
router.get('/delete', async (ctx) => {

    ctx.body = 'delete';
})



module.exports = router;





