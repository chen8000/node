const router = require('koa-router')();
const DB = require('../../module/db');



// 联系我们connect
router.get('/', async (ctx) => {

    await ctx.render('index/connect');
});



module.exports = router.routes();



