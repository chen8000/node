

const router = require('koa-router')();



router.get('/', async (ctx) => {

    ctx.render('admin/index');
});

router.get('/changeStatus', async (ctx) => {

    ctx.body = {"username":"zhanghui","password":"zhanghui666"}
})



module.exports = router.routes();








