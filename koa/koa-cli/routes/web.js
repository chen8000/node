

const router = require('koa-router')();




//首页
router.get('/', async (ctx) => {

    ctx.body = 'zhanghui 666   -index';
});



module.exports = router;



