

const router = require('koa-router')();



router.get('/', async (ctx) => {

    ctx.body = 'admin';
})





module.exports = router.routes();








