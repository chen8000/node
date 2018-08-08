

const router = require('koa-router')();
const DB = require('../../module/db');



// 返回给前端接口
router.get('/', async (ctx) => {

    let result = await DB.find('article', [{}]);

    ctx.body = { result };

});


router.post('/post', async (ctx) => {

    let result = await DB.find('article', [{}]);

    ctx.body = { result };

});

router.get('/info', async (ctx) => {

    let result = ctx.query;

    ctx.body = result;

});





module.exports = router.routes();




