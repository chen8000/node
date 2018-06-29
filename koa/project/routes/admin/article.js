

const router = require('koa-router')();



router.get('/list', async (ctx) => {

    ctx.body = '--- list';
});

router.get('/add', async (ctx) => {

    ctx.body = '--- add';
})



module.exports = router.routes();












