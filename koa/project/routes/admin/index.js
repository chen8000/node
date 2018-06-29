

const router = require('koa-router')();
const DB = require('../../module/db');



router.get('/', async (ctx) => {

    ctx.render('admin/index');
});

router.get('/changeStatus', async (ctx) => {

    let result = await ctx.query; //获取get传值
    

    // 把要修改状态的这条数据查出来
    let Status = await DB.find(result.collectionName,{"_id":await DB.ObjectID(result.id)});

    // 修改status状态  0===X   1===√
    result.status = Status[0].status == 0 ? 1 : 0;



    //去数据库更新数据
    let success = await DB.update(result.collectionName, {"_id":await DB.ObjectID(result.id)}, {'status':result.status})


    
    if(success){
        
        //返回给前端的数据  成功后
        ctx.body = {'message':"更新状态成功","success":true}
    }else{
        //返回给前端的数据  失败后
        ctx.body = {'message':"更新状态失败","success":false}
    }
    
})



module.exports = router.routes();








