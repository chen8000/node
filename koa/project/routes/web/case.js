const router = require('koa-router')();
const DB = require('../../module/db');

/*
    数据库查询  DB.find(dbName, [{"pid":{$in:[]}}])
    in查询操作符，查询这个数据库里的数据  
    如果数据的 pid == $in:[] 数组里的数组项的任意一项  则把这条数据查出来

*/ 


// 成功案例case
router.get('/', async (ctx) => {

    let tab = ctx.query.pid;
    
    let maxClassification = await DB.find("articlecate", [{"pid":"5b345495518729038178f082"}]);
    let inArr = [];

    if(!tab){
        for(let i = 0; i<maxClassification.length; i++){
            inArr.push(maxClassification[i]._id.toString());
        }
    }else{
        inArr.push(tab);
    }
   

    // 使用$in操作符查询数据
    let minClassification = await DB.find('article', [{"pid":{$in:inArr}}]);

    await ctx.render('index/case', { maxClassification, minClassification, tab});
});



module.exports = router.routes();



