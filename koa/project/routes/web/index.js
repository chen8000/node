const router = require('koa-router')();
const DB = require('../../module/db');





// 首页
router.get('/', async (ctx) => {

    // 轮播图
    let focus = await DB.find('focus', [{"status":"1"}, {}, {"sort":1}]);

    await ctx.render('index/index', { focus });
});



module.exports = router.routes();


