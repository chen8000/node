

const router = require('koa-router')();
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
})

 



module.exports = router.routes();










