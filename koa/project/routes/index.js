


const router = require('koa-router')();

router.get('/', async (ctx) => {

    console.log(ctx.session.userinfo)

    await ctx.render('index');
})



module.exports = router.routes();








