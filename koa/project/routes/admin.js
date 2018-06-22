

const router = require('koa-router')();

//子模块
const login = require('./admin/login');
const user = require('./admin/user');



router.get('/', async (ctx) => {

    ctx.body = 'admin';
});

router.use('/login', login);
router.use('/user', user);





module.exports = router.routes();








