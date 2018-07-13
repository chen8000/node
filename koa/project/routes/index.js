


const router = require('koa-router')();
const url = require('url');
const DB = require('../module/db');


// 子模块
const about = require('./web/about');
const connect = require('./web/connect');
const index = require('./web/index');
const news = require('./web/news');
const service = require('./web/service');
const casePage = require('./web/case');


router.use(async (ctx, next) => {

    let pathname=url.parse(ctx.request.url).pathname.substring(1);
    let splitUrl = pathname.split('/');

    // 渲染导航数据--common
    let result = await DB.find('nav', [{"status":"1"}, {}, {'sort':1}]);

    // 配置全局用户信息
    ctx.state.G = {
        url:splitUrl,
        nav:result
    };
    ctx.state.__HOST__='http://'+ctx.request.header.host;

    await next();
});


// 加载子路由
router.use('/', index);
router.use('/news', news);
router.use('/about', about);
router.use('/case', casePage);
router.use('/service', service);
router.use('/connect', connect);





module.exports = router.routes();








