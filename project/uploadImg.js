

/*
1. 安装模块
npn install multiparty --save-dve

2. const multiparty = require("mutiparty");

3. 上传图片的地方

    const form = new multiparty.Form();

    form.uploadDir = 'upload' //图片保存的地址

    form.parse(req, function(err, fields, files) {
      
        //获取提交的数据以及图片上传成功后返回的图片信息
    });


4. html 页面，form标签上要加入自定义属性 enctype="multipart/form-data"   


*/







