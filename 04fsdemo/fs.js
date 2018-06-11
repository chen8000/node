
// 找到目标文件夹下的子目录里的图片文件
// 获取到目标文件夹的名字，并把该文件夹下的图片文件重命名为该文件夹的名字+i

const fs = require('fs');
const path = require('path');
const fsApp = require('./module/fs.event');

let filePath = 'images';
fs.readdir(filePath,(err, res) => {

    if(err){
        console.log(err);
        return;
    }

    //删除.Ds文件
    fsApp.removeDs(res);

    // 拿到了当前文件夹下的目录和文件 -- res
// 循环目录看看是文件还是目录，如果是文件，那么改名，如果是目录那么显示出这个目录下的文件，
// 循环这个目录下的文件
    (function fsForEach(res, filePath){
        
        res.forEach((value, index, arr) => {

            if(err){
                console.log(err);
                return;
            }
        
            fs.stat(filePath+'/'+value, (err, stats) => {
                if(err){
                    console.log("uuuuu"+ err);
                    return;
                }
    
                
                //是目录，那么往下找一级
                
                if(stats.isDirectory()){
    
                    fs.readdir(filePath + '/' + value, (err, res) => {
                        if(err){
                            console.log(err);
                            return;
                        }
                        //删除.Ds文件
                        fsApp.removeDs(res);


                        // console.log("--------" + filePath + '/' + value)
                        
                        fsForEach(res, filePath + '/' + value);
                        return;
                    })
                }
                // fs .rename(filePath + '/' + value, filePath + '/' + filePath )
                // 是个文件  那么重命名这个文件    
                if(stats.isFile()){
                    //获取文件的后缀名
                    let suf = path.extname(value);

                    //将要被改名的文件路径
                    let isFilePath = filePath + '/' + value;

                    //改完名的文件路径
                    let toFilePath = filePath + '/' + path.parse(filePath).name + index + suf;
                    
                    // console.log(filePath)
                    //重命名为此文件夹的名字
                    fs.rename(isFilePath, toFilePath, (err) => {
                        if(err){
                            console.log(+err);
                            return;
                        }
                    });
                }
            });
        });

    })(res, filePath);
    
});







