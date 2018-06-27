

const router = require('koa-router')();
const url = require('url');

//子模块
const login = require('./admin/login');
const user = require('./admin/user');
const manage = require('./admin/manage');
const index = require('./admin/index');




//判断用户是否登陆
router.use(async (ctx, next) => {

    let pathname=url.parse(ctx.request.url).pathname.substring(1);

    let splitUrl = pathname.split('/');
    
    // 配置全局用户信息
    ctx.state.G = {

        url:splitUrl,
        userInfo:ctx.session.userinfo
    }
    ctx.state.__HOST__='http://'+ctx.request.header.host;
    //   如果用户登陆，继续向下执行
    //   如果没有登陆, 跳转到登陆页面



    //权限判断
    if(ctx.session.userinfo){
        await  next();
    }else{  //没有登录跳转到登录页面
        if(pathname=='admin/login' || pathname=='admin/login/doLogin' || pathname == 'admin/login/code'){
            await  next();
        }else{
            ctx.redirect('/admin/login');
        }
    }
})



router.use(index);
router.use('/login', login);
router.use('/user', user);
router.use('/manage', manage);




/*
 一级分类 pid:0  _id:''   // _id 为自动生成

 一级分类下的二级分类   pid == 一级分类的_id

 

*/ 
// 




module.exports = router.routes();








