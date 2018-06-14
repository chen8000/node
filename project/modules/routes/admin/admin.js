

const express = require('express');
const router = express.Router();

const login = require('./routes/login');
const product = require('./routes/product');
const user = require('./routes/user');


//配置路由-- 挂载路由
router.use('/', login);
router.use('/login', login);
router.use('/product', product);
router.use('/user', user);



//暴露出去
module.exports = router;



















