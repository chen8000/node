

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


//fs.appendFile  追加文件


// 没有文件则创建，
// 有文件则在文件里写内容，
// 不会覆盖之前写入的内容，
// 会在之前的内容后面追加内容
fs.appendFile('appendFile.txt','zhanghui.chen 666',(err)=>{
    if(err){
        console.log(err);
        return;
    }

    console.log('追加成功');
});





