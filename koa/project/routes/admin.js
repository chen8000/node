

const router = require('koa-router')();

//子模块
const login = require('./admin/login');
const user = require('./admin/user');



//判断用户是否登陆
// router.use(async (ctx, next) => {
    
    

//     //   如果用户登陆，继续向下执行
//     //   如果没有登陆, 跳转到登陆页面

//     console.log(ctx.url)

//     console.log('admin')

//     console.log(ctx.session.userinfo)


    
//     if(ctx.session.userinfo){
//         await next();
//     }else{

        
//         if(ctx.url == '/admin/login' || ctx.url == '/admin/login/doLogin'){
//             await next();
//         }else{

//             await ctx.redirect('/admin/login');
            
//         }
//     }
// })



router.get('/', async (ctx) => {

    ctx.body = 'admin';
});

router.use('/login', login);
router.use('/user', user);





module.exports = router.routes();








