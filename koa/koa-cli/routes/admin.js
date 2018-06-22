

//后台管理首页


const router = require('koa-router')();


//子模块
const focus = require('./admin/focus');
const user = require('./admin/user');


//配置子模块中间件
router.use('/focus', focus);
router.use('/user', user);


//首页
router.get('/', async (ctx) => {

    await ctx.render('admin/index');
});



module.exports = router.routes();






