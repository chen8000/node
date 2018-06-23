

const router = require('koa-router')();
const db = require('../../module/db');
const toos = require('../../module/toos');
const dbName = 'admin';



router.get('/', async (ctx) => {

    await ctx.render('admin/login');
});

router.post('/doLogin', async (ctx) => {

    
    
//     //拿到登陆信息
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;

    console.log(username+password)

    let result = await db.find(dbName, {"username":username,"password":password});

    

    if(result.length > 0){

        ctx.session.userinfo = result[0];

        ctx.redirect('/admin');
        
    }else{
        console.log('失败')
    }
    
    
});

router.get('/news', async (ctx) => {





    db.find(dbName, {"username":'chen',"password":toos.md5('123456')}).then((res) => {
        ctx.session.userinfo = res[0];

        console.log(res)
        
    });

    // await ctx.render('admin/login');
    console.log(1)
    

    // ctx.session.userinfo = result[0];

   
})
router.get('/new', async (ctx) => {

    ctx.body = '456'

    console.log(ctx.session.userinfo)
})

 



module.exports = router.routes();










