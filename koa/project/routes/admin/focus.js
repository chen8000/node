
const router = require('koa-router')();
const DB = require('../../module/db');
const dbName = 'focus';




router.get('/', async (ctx) => {

    let result = await DB.find(dbName, [{}]);
    
    ctx.render('admin/focus/list',{result});
});



/*
title
url
pic
status


*/ 





module.exports = router.routes();








