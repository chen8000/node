

// 用户模块

const router = require('koa-router')();


router.get('/', async (ctx) => {

    ctx.body = 'user.js'
})


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









