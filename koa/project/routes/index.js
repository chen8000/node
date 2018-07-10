


const router = require('koa-router')();
const url = require('url');

router.use(async (ctx, next) => {
    let pathname=url.parse(ctx.request.url).pathname.substring(1);

    let splitUrl = pathname.split('/');
    
    // 配置全局用户信息
    ctx.state.G = {
        url:splitUrl
    }

    await next();
})

// 首页
router.get('/', async (ctx) => {

    await ctx.render('index/index');
});

// 开发服务service
router.get('/service', async (ctx) => {

    await ctx.render('index/service');
});

// 成功案例case
router.get('/case', async (ctx) => {
    
    await ctx.render('index/case');
});

// 新闻资讯news
router.get('/news', async (ctx) => {

    await ctx.render('index/news');
})

// 关于我们about
router.get('/about', async (ctx) => {

    await ctx.render('index/about');
});

// 联系我们connect
router.get('/connect', async (ctx) => {

    await ctx.render('index/connect');
})




module.exports = router.routes();








