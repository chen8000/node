

const router = require('koa-router')();



router.get('/', async (ctx) => {

    ctx.body = 'user';
})



module.exports = router.routes();










