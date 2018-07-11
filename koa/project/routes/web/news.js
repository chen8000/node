const router = require('koa-router')();
const DB = require('../../module/db');







// 新闻资讯news
router.get('/', async (ctx) => {

    await ctx.render('index/news');
});



module.exports = router.routes();



