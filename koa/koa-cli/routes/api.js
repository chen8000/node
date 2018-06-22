

const router = require('koa-router')();



router.get('/', (ctx) => {

    ctx.body = {"title":"这是一个api接口"}
})






module.exports = router.routes();





