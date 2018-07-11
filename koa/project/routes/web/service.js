const router = require('koa-router')();
const DB = require('../../module/db');

//  导入子模块
const list = require('./service/list');



// 开发服务service
router.get('/', async (ctx) => {

    // 开发服务
    let articleId = await DB.find('articlecate', [{"title":"开发服务"}]);

    let result = await DB.find('article', [{'pid':articleId[0]._id.toString()}]);

    await ctx.render('index/service', { result });
});

// 加载子模块
router.use('/list', list);


module.exports = router.routes();







