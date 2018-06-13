

/*
图片上传模块
即可以上传图片也可以获取表单提交的数据




1. 安装模块
npn install multiparty --save-dve

2. const multiparty = require("mutiparty");

3. 上传图片的地方

    const form = new multiparty.Form();

    form.uploadDir = 'upload' //图片保存的地址

    form.parse(req, function(err, fields, files) {

        err  错误信息
        fields 获取表单的数据
        files  图片上传成功返回的信息
      
        //获取提交的数据以及图片上传成功后返回的图片信息
    });


4. html 页面，form标签上要加入自定义属性 enctype="multipart/form-data"   


*/







