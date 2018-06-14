


const koa = require('koa');
const app = new koa();


//中间件
app.use( async (ctx) => {

    ctx.body = '666';
});


//promise    异步函数
const p = new Promise((resolve, reject) => {

    setTimeout(() =>{
        resolve('123')
    },1000);
});

p.then((data) => {
    console.log(data);
});



// async  让一个方法变成异步方法

// await  等待这个异步方法执行完




app.listen(8000);

















