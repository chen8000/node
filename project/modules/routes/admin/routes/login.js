
const express = require('express');
const router = express.Router();
const md5 = require('md5-node');
const bodyParser = require('body-parser');
const db = require('../../../mongodb/db')

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

//登陆页面路由
router.get('/', (request, response) => {

    response.render('admin/login');
});

//提交路由
router.post('/doLogin', (request, response) => {

    
    //1. 获取数据
    // let getPost = request.body;

    //对密码进行加密
    request.body.password = md5(request.body.password);

    //查询数据
    db.find('user', request.body, (data) => {
        
        if( data.length > 0 ){
            console.log('登陆成功');

            //登陆成功后保存用户信息
            request.session.userInfo = data[0];
            
            //跳转页面
            response.redirect('/admin/product');
            
            
        }else{
            console.log('登陆失败');

            response.send(`<script>alert('登陆失败'); location.href='/admin/login'</script>`);
        }
    });

})


module.exports = router;














