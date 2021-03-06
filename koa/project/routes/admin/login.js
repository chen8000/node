

const router = require('koa-router')();
const svgCaptcha = require('svg-captcha');//生成验证码模块
const DB = require('../../module/db');
const tools = require('../../module/tools');
const dbName = 'admin';




router.get('/',async (ctx)=>{
    await ctx.render('admin/login');
});


router.post('/doLogin',async (ctx)=>{
    
    //拿到post传值 -- 用户输入的值
    let username = ctx.request.body.username; 
    let password = ctx.request.body.password;
    // 判断用户输入的验证码是否正确 -不区分大小写
    let codeType = ctx.request.body.code.toLowerCase() === ctx.session.code.toLowerCase();  

    // 去数据库匹配数据
    let result = await DB.find(dbName, [{"username":username, "password":tools.md5(password)}]);

    // 验证码 
    if(!codeType){

        // 如果验证码错误重新跳转到登陆页面
        ctx.render(`admin/public/error`, 
            { 
                msg:`登陆失败，验证码错误`,
                redirect:`${ctx.state.__HOST__}/admin/login`
            }
        );

        return;
    }

    // 有数据，证明登陆成功了，
    if(result.length > 0){

        //把数据存到session里 - 以便其他页面判断用户是否登陆
        ctx.session.userinfo = result[0];

        //修改最后登陆时间
        await DB.update(dbName, {"_id":await DB.ObjectID(result[0]._id)}, {"last_time":new Date()})

        //跳到admin页面
        ctx.redirect(ctx.state.__HOST__+'/admin');
    }else{
        // 如果账号或者密码错误
        ctx.render(`admin/public/error`, 
            { 
                msg:`登陆失败，用户名或密码错误`,
                redirect:`${ctx.state.__HOST__}/admin/login`
            }
        );
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

    // 把后台生成的验证码存入session
    ctx.session.code = captcha.text;

    console.log(ctx.session.code)

    ctx.body = captcha.data; 
});


//退出登陆
router.get('/loginOut', async (ctx) => {

    ctx.session.userinfo = null;//把session设置为空

    //退出登陆后跳转到login页面
    ctx.redirect(`${ctx.state.__HOST__}/admin/login`)
});

 



module.exports = router.routes();










