

const router = require('koa-router')();



router.get('/', async (ctx) => {

    await ctx.render('login');
})




module.exports = router.routes();










