
const express = require('express');
const router = express.Router();
const db = require('../../../mongodb/db');

router.get('/', (request, response) => {

    db.find('user', {}, (data) => {

        response.render('admin/user/index', {list:data});
    })
});

//增加用户
router.get('/add', (request, response) => {

    response.send('增加用户');

    // response.render('/admin/user/add');
});

//删除用户
router.get('/edit', (request, response) => {

    response.send('修改用户');
})


module.exports = router;














