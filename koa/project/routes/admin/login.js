

const router = require('koa-router')();
const svgCaptcha = require('svg-captcha');//生成验证码模块
const DB = require('../../module/db');
const tools = require('../../module/tools');
const dbName = 'admin';




router.get('/',async (ctx)=>{
    await ctx.render('admin/login');
});


router.post('/doLogin',async (ctx)=>{
    
    //拿到post传值
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;

    // 去数据库匹配数据
    let result = await DB.find(dbName, {"username":username, "password":tools.md5(password)});

    // 有数据，证明登陆成功了，
    if(result.length>0){

        //把数据存到session里
        ctx.session.userinfo = result[0];

        //跳到admin页面
        ctx.redirect(ctx.state.__HOST__+'/admin');
    }else{
        console.log('失败');

    }
});


//验证码
router.get('/code', async (ctx) => {

    // 创建一个验证码  【数字和字母】
    let captcha = svgCaptcha.create({
        size:4,   //生成几位的验证码
        fontSize:35, //字体大小
        width:80, //验证码的宽
        height:35, //验证码的高度
        background:'orange' //验证码的背景颜色
    });

    // 创建一个验证码 【加法】
    // let mathCaptcha = svgCaptcha.createMathExpr({
    //     fontSize:50, //字体大小
    //     width:100, //验证码的宽
    //     height:40, //验证码的高度
    //     background:'rgba(0,0,0,.3)' //验证码的背景颜色
    // })


    // captcha.text  - 表示验证码的内容
    // console.log(captcha.text)

    ctx.response.type = 'image/svg+xml'; //设置验证码的响应头

    // captcha.data  - 生成的验证码
    ctx.body = captcha.data; 
})

 



module.exports = router.routes();










