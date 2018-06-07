

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


// fs.unlink 删除文件

fs.unlink('r/12.txt',(err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log('删除文件成功');
});

// fs.rmdir 删除目录(需要先删除目录里的文件)

fs.rmdir('r',(err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log('删除目录成功');
});








