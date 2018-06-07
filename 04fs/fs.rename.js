

/*
    fs.stat  检测是文件还是目录
    fs.mkdir 创建目录
    fs.writeFile 创建写入文件
    fs.appendFile 追加文件
    fs.readFile 读取文件
    fs.readdir 读取目录
    fs.rename 重命名
    fs.rmdir 删除目录
    fs.unlink 删除文件
*/

//导入fs模块
var fs = require('fs');

// fs.rename 1.重命名  
// 2. 剪切文件，，把文件从a文件夹下移动到b文件夹下

// 重命名
fs.rename('html/index.html','html/new.html',(err)=>{
    if(err){
        console.log(err);
        return;
    }

    console.log('重命名成功');
});

//移动并重命名
//第一个参数  将要被移动的目标文件
//第二个参数  要放到什么位置和要改成什么名字
fs.rename('html/style.css','html/css/base.css',(err)=>{
    if(err){
        console.log(err);
        return ;
    }
    console.log('剪切成功');
})





