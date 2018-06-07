

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


//fs.writeFile  创建写入文件

/*

    filename (string) 文件名称
    data   (string | Buffer) 将要写入的内容，可以是字符串或者 Buffer数据
    options (Object) option数组对象
    callback (function) 回调  传递一个异常参数

*/ 

//创建写入文件
//第一个参数为要创建的文件
//第二个参数为要写入的内容
//第三个参数接收一个异常参数
fs.writeFile('writeFile.txt','zhenghui.chen 666',(err)=>{
    if(err){
        console.log(err)
        return;
    }

    console.log('创建写入文件成功');

});





