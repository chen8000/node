
const express = require('express');
const router = express.Router();
const multiparty = require('multiparty');
const md5 = require('md5-node');
const db = require('../../../mongodb/db');

router.get('/', (request, response) => {

    db.find('user', {}, (data) => {

        console.log(data)

        response.render('admin/user/index', {list:data});
    })
});

//增加用户
router.get('/add', (request, response) => {

    // response.send('增加用户');


    response.render('admin/user/add');
});

// 增加用户提交到这里，
router.post('/doAdd', (request, response) => {

    //获取提交的数据以及图片信息
    const form = new multiparty.Form();

    form.uploadDir = 'upload' //图片保存的地址

    form.parse(request, function(err, fields, files) {

        if(err){
            console.log(err);
            return;
        }
        //提交过来的信息
        let _files = {
            username : fields.username[0],
            password : md5(fields.password[0]), // 对密码进行加密
            status : 1
        };

        //把信息保存到数据库里
        db.insertOne('user', _files, (data) => {

            response.redirect('/admin/user');
        });
        
    });
})

//修改用户
router.get('/edit', (request, response) => {


    db.find('user', {"_id" : new db.ObjectID(request.query.id)}, (data) => {

        response.render('admin/user/edit', {list:data[0]});
    }); 
});

//修改后提交
router.post('/doEdit', (request, response) => {

    //获取提交的数据以及图片信息
    const form = new multiparty.Form();

    form.uploadDir = 'upload' //图片保存的地址

    form.parse(request, function(err, fields, files) {

        if(err){
            console.log(err);
            return;
        }
        //提交过来的信息
        let _files = {
            username : fields.username[0],
            password : md5(fields.password[0]), // 对密码进行加密
            status : 1
        };

        //把信息保存到数据库里
        db.updateOne('user', {"_id":new db.ObjectID(fields._id[0])}, _files, (data) => {

            response.redirect('/admin/user');
        });
        
    });
});

//删除用户
router.get('/delete', (request, response) => {
    //删除数据
    db.deleteOne('user', {'_id':new db.ObjectID(request.query.id)}, (data) => {
        response.redirect('/admin/user');
    });

})


module.exports = router;














