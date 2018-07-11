const router = require('koa-router')();
const DB = require('../../module/db');




// 成功案例case
router.get('/', async (ctx) => {
    
    await ctx.render('index/case');
});

// 服务行业

// 教育行业

// 房地产行业

// 能源行业




module.exports = router.routes();



