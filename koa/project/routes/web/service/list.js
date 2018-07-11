
const router = require('koa-router')();
const DB = require('../../../module/db');



router.get('/', async (ctx) => {

    let id = ctx.query.id;

    let result = await DB.find('article', [{"_id":await DB.ObjectID(id)}]);

    console.log(result)

    await ctx.render('index/service/list', { result });
});




module.exports = router.routes();








