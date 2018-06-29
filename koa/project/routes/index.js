


const router = require('koa-router')();

router.get('/', async (ctx) => {

    await ctx.render('index/index');
})



module.exports = router.routes();








