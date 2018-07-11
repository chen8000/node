const router = require('koa-router')();
const DB = require('../../module/db');




// 关于我们about
router.get('/', async (ctx) => {

    await ctx.render('index/about');
});




module.exports = router.routes();


