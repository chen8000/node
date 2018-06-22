

//后台管理首页


const router = require('koa-router')()


//首页
router.get('/', async (ctx) => {

    ctx.body = 'zhanghui 666   -admin'
});






module.exports = router;






