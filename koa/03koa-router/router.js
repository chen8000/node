


const Koa = require('koa');
const router = require('koa-router')();  // 表示引入并实例化

const app = new Koa();


router.get('/', async (ctx) => {

    ctx.body = '首页';
});
router.get('/news', async (ctx) => {

    ctx.body = '新闻';
});
router.get('/newscontent', async (ctx) => {

    ctx.body = '新闻详情页';
});

router.get('/getGet', async (ctx) => {
   
    //获取get传值一   [获取的是对象，用的最多的]
    console.log(ctx.query);

    //获取get传值二     [获取到地址栏后面的参数，以string的方式]
    console.log(ctx.querystring);


    




    ctx.body = '获取get传值';
})




// 启动路由
app
    .use(router.routes()) // 启动路由
    .use(router.allowedMethods()); //  根据上下文环境配置 response 响应头





app.listen(8000);







