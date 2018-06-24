

const router = require('koa-router')();
const db = require('../../module/db');
const dbName = 'admin';



router.get('/', async (ctx) => {

    await ctx.render('admin/login');
});

router.post('/doLogin', async (ctx, next) => {

    
    
//     //拿到登陆信息
    let getLoginInfo = ctx.request.body

    let result = await db.find(dbName, getLoginInfo);
    
    if(result.length > 0){
        

        ctx.session.userinfo = result[0];

        ctx.redirect('/admin');
        
    }else{
        console.log('失败')
    }
    
    
});

 



module.exports = router.routes();










