
const router = require('koa-router')();


// 子模块
const calelist = require('./api/calelist');




router.get('/', async (ctx) => {

    ctx.body = 'api';
});

// 页面
router.get('/html', async (ctx) => {

    ctx.render('index/ajax/ajax_get');
})

// 加载子模块
router.use('/calelist', calelist);


module.exports = router.routes();








