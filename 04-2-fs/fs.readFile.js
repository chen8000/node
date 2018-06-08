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

fs.readdir('html',function(err, files) {

    if(err){
        console.log(err);
    }else{

        //闭包自执行函数，传入自增下标，和一个放入目录的数组
        (function statFile(i,filesArr){
            
            //如果递归函数的i跟读取到的目录length相等时，结束递归
            //打印出放有目录的数组
            if(i == files.length){
                console.log('目录')
                console.log(filesArr)
                return false;
            }

            //判断是目录还是文件。是目录就放到数组里
            fs.stat('html/' + files[i], (error, stats)=> {
                if(error){
                    console.log('stat'+error);
                    return;
                }else{

                    //如果是目录
                    if(stats.isDirectory()){
                        filesArr.push(files[i]);
                        // console.log('l'+filesArr)
                    }
                }
                //递归，增加i，把数组传进去。
                statFile(i+1,filesArr);
            });
        })(0,[]);
    }
})