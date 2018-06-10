

// 把浏览过的页面的名字显示到首页

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.listen(8000,'127.0.0.1');

app.use(cookieParser());

app.get('/', (request, response) => {

    //获取cookie值，并显示
    let oid = request.cookies.oid;
    response.send('首页' + oid);
});

app.get('/page', (request, response) => {

    //获取到地址兰里的cid
    let cid = request.query.cid;
    //获取到cookie里存的oid
    let oid = request.cookies.oid;

    //判断cookie里有没有存这个值
    //如果没有值，那么要把地址栏里获取到的值push进去
    if(!oid){
        oid = [];
        oid.push(cid);

        //else就是有值，那么就直接push
    }else{
        
        oid.push(cid);
    }

    //然后把这些值存起来
    response.cookie('oid',oid,{maxAge:60*10000});

    response.send('城市：'+ oid)
});






