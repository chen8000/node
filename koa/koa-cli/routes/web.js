

// web首页

const router = require('koa-router')();




//首页
router.get('/', async (ctx) => {

    await ctx.render('web/index');
});



module.exports = router;



