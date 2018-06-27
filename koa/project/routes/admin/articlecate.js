
const router = require('koa-router')();




router.get('/', async (ctx) => {

    ctx.body = 'articlecate';
});

// 列表
router.get('/list', async (ctx) => {

    ctx.body = 'articlecate--list';
});

// 增加
router.get('/add', async (ctx) => {

    ctx.body = 'articlecate -- add';
});




module.exports = router.routes();











