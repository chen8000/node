

const router = require('koa-router')();
const db = require('../../module/db');
// const toos = require('../../module/toos');
const dbName = 'admin';



router.get('/', async (ctx) => {

    await ctx.render('admin/login');
});

router.post('/doLogin', async (ctx) => {

    
    
    //拿到登陆信息
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;

    let result = await db.find(dbName, {"username":username,"password":password});

    

    if(result.length > 0){

        ctx.session.userinfo = {'name':'123'};


        
        
        ctx.redirect('/admin');
        console.log(ctx.session.userinfo)
        // ctx.body = '666';
    }else{
        console.log('失败')
    }
    
    
});

 



module.exports = router.routes();










