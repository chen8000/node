
const express = require('express');
const router = express.Router();
const fs = require('fs');
const db = require('../../../mongodb/db');
//图片上传模块
const multiparty = require('multiparty');

//商品列表
router.get('/', (request, response) => {

    //去数据库里查数据
    db.find('product', {}, (data) => {
           
        response.render('admin/product/index', {list:data});
    });
});

//添加商品
router.get('/add', (request, response) => {


    response.render('admin/product/add');

});

router.post('/doAdd', (request, response) => {


    //获取提交的数据以及图片信息
    const form = new multiparty.Form();

    form.uploadDir = 'upload' //图片保存的地址

    form.parse(request, function(err, fields, files) {

        if(err){
            console.log(err);
            return;
        }

        // fields  表单提交上来的信息
        // files 图片上传成功后提交的信息

        // 获取数据
        //  { title: [ '商品描述:' ],
        //   price: [ '商品描述:' ],
        //   fee: [ '商品描述:' ],
        //   description: [ '商品描述:' ] }

        //提交过来的信息
        let _files = {
            title : fields.title[0],
            price : fields.price[0],
            fee : fields.fee[0],
            description : fields.description[0],
            pic : files.pic[0].path
        };

        //把信息保存到数据库里
        db.insertOne('product', _files, (data) => {
            
            
            response.redirect('/admin/product/add');
        })

        // 图片信息(地址)


        // 图片信息
        // { pic:[ { fieldName: 'pic',
        //        originalFilename: '175_03.png',
        //        path: 'upload/6AL02SHRrm2KnU21W8vfDNmw.png',
        //        headers: [Object],
        //        size: 237946 } 
            //] }

        
      
        //获取提交的数据以及图片上传成功后返回的图片信息
    });
})


//修改商品
router.get('/edit', (request, response) => {

    db.find('product', {"_id":new db.ObjectID(request.query.id)}, (data) => {

        response.render('admin/product/edit', {list:data[0]});
    })
});

router.post('/doEdit', (request, response) => {

    //获取提交的数据以及图片信息
    const form = new multiparty.Form();

    form.uploadDir = 'upload' //图片保存的地址

    form.parse(request, function(err, fields, files) {

        if(err){
            console.log(err);
            return;
        }

        // fields  表单提交上来的信息
        // files 图片上传成功后提交的信息

        // 获取数据
        //  { title: [ '商品描述:' ],
        //   price: [ '商品描述:' ],
        //   fee: [ '商品描述:' ],
        //   description: [ '商品描述:' ] }

        //提交过来的信息
        let _files = {
            title : fields.title[0],
            price : fields.price[0],
            fee : fields.fee[0],
            description : fields.description[0],
            pic : ((path)=>{

                //判断是否修改了图片
                //如果没有修改，图片地址为原图片地址
                if(!files.pic[0].originalFilename){

                    //删除生成的无用图片
                    fs.unlink(files.pic[0].path, (err) => {
                        if(err){
                            console.log(err);
                        }
                    });
                    return fields.picOriginal[0];
                    //如果修改了就拿最新的地址
                }else{
                    return path;
                }
            })(files.pic[0].path)
        };


        //修改数据
        db.updateOne('product', {"_id":new db.ObjectID(fields._id[0])}, _files, (data) => {
            
            // console.log(data)

            response.redirect('/admin/product/index');
        })

        // 图片信息(地址)
        
        // 图片信息
        // { pic:[ { fieldName: 'pic',
        //        originalFilename: '175_03.png',
        //        path: 'upload/6AL02SHRrm2KnU21W8vfDNmw.png',
        //        headers: [Object],
        //        size: 237946 } 
            //] }
            
        //获取提交的数据以及图片上传成功后返回的图片信息
    });
})

//删除商品
router.get('/delete', (request, response) => {

    //删除服务器上的图片
    fs.unlink(request.query.picPath, (err) =>{
        if(err){
            console.log(err);
        }
    });
    
    //删除数据
    db.deleteOne('product', {'_id':new db.ObjectID(request.query.id)}, (data) => {
        response.redirect('/admin/product/index');
    });


})


module.exports = router;














