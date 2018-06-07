

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

//导入fs模块
var fs = require('fs');


//fs.readFile  读取文件
// 第一个参数为 要读取的文件
// 第二个参数为 读取到的文件的编码格式
// 第三个参数为 回调 两个参数，一个是异常信息，一个读取到的数据
fs.readFile('readFile.txt','utf8',(err,res)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log(res);
})





