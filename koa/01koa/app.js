

//引入koa 
const koa = require('koa');
//实例化 koa
const app = new koa();


//中间件
app.use( async (ctx) => {

    //给页面打印一句话
    ctx.body = 'hello word  zhanghui.chen 666';
})






app.listen(8000);











