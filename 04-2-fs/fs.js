

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

var fs = require('fs');

// 判断upload目录是否存在，如果不存在，那么创建这个目录

fs.stat('upload',(err,stats)=>{
    if(err){
        fs.mkdir('upload',(mkerror)=>{
            if(mkerror){
                console.log(mkerror);
                return;
            }

            console.log('创建成功');
        })
    }else{
        console.log('这个目录已经存在');
        console.log(stats.isDirectory());
    }


})