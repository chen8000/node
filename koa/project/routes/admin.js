

const router = require('koa-router')();

//子模块
const login = require('./admin/login');
const user = require('./admin/user');
const url = require('url');



//判断用户是否登陆
router.use(async (ctx, next) => {
    
    
    ctx.state.__HOST__='http://'+ctx.request.header.host;
    //   如果用户登陆，继续向下执行
    //   如果没有登陆, 跳转到登陆页面

    var pathname=url.parse(ctx.request.url).pathname;

    //权限判断
    if(ctx.session.userinfo){
        await  next();
    }else{  //没有登录跳转到登录页面
        if(pathname=='/admin/login' || pathname=='/admin/login/doLogin' ){
            await  next();
        }else{
            ctx.redirect('/admin/login');
        }
    }
})



router.get('/', async (ctx) => {

    ctx.render('admin/index');
});


router.use('/login', login);
router.use('/user', user);





module.exports = router.routes();








