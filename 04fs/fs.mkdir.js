

/*
    fs.stat  检测是文件还是目录
    fs.mkdir 创建目录
    fs.writeFile 创建写入文件
    fs.appendFile 追加文件
    fs.readFile 读取文件
    fs.rename 重命名
    fs.rmdir 删除目录
    fs.unlink 删除文件
*/


// fs.mkdir 参数

// path 将要创建的目录路径
// mode 目录权限（读写权限，默认 0777）
// callback 回调，传递异常参数

//导入fs模块
var fs = require('fs');

//创建文件
fs.mkdir('css',(err)=>{
    if(err){
        console.log(err);

        return;
    }

    console.log('创建目录成功');
})

