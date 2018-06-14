

const express = require('express');
const router = express.Router();

const login = require('./routes/login');
const product = require('./routes/product');
const user = require('./routes/user');


//自定义中间件，判断用户是否登陆
router.use((request, response, next) => {

    if(request.url == "/login" || request.url == '/login/doLogin'){
        
        next();
    }else{
        //判断有没有登陆
        
        if(request.session.userInfo && request.session.userInfo.username !== ''){
            
            //设置全局数据
            request.app.locals['userInfo'] = request.session.userInfo;
            
            next();
        }else{
            response.redirect('/admin/login');
        }
    } 
});

//配置路由-- 挂载路由
// router.use('/', login);
router.use('/login', login);
router.use('/product', product);
router.use('/user', user);



//暴露出去
module.exports = router;



















