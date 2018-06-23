

const router = require('koa-router')();

//子模块
const login = require('./admin/login');
const user = require('./admin/user');

router.use( async (ctx, next) => {

    // ctx.request.header.host;

    ctx.state.__HOST__ = `http://${ctx.request.header.host}`;

    next();
})

router.get('/', async (ctx) => {

    ctx.body = 'admin';
});

router.use('/login', login);
router.use('/user', user);





module.exports = router.routes();








