

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

//使用fs.stat方法检测是文件还是目录 
//第一个参数为要检测的文件或目录名，第二个参数是一个函数，接收两个参数
// error 也不是文件也不是目录，错误信息
// stats 检测到的文件或目录对象
fs.stat('html/index.txt',(error,stats)=>{
    if(error){
        console.log(error);
        return;
    }


    //返回true  /  false

    // isFile()  是否是文件
    console.log('文件' + stats.isFile());

    //isDirectory() 是否是目录
    console.log('目录'+ stats.isDirectory());
})

