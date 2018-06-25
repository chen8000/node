

const router = require('koa-router')();
const DB = require('../../module/db');
const tools = require('../../module/tools');
const dbName = 'admin';




router.get('/',async (ctx)=>{
    await ctx.render('admin/login');
})


router.post('/doLogin',async (ctx)=>{
    

    let username = ctx.request.body.username;

    let password = ctx.request.body.password;

    let result = await DB.find(dbName, {"username":username, "password":tools.md5(password)});

    if(result.length>0){

        ctx.session.userinfo = result[0];

        ctx.redirect(ctx.state.__HOST__+'/admin');
    }else{
        console.log('失败');

    }
})

 



module.exports = router.routes();










