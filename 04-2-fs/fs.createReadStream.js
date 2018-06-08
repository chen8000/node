
// fs.createReadStream()   //读取流
/*
    它时一块一块读的，
    1.每读到一块会广播一个data事件
    2.读取完成会广播一个end事件
    3.读取失败会广播一个error事件

*/ 

const fs = require('fs');

//读取文件(文件流的方式读取文件)（文件比较多的时候分开来读，这样不会卡死）
let readStream = fs.createReadStream('input.txt');

let str = '';
//接收读取到的数据
readStream.on('data', (chunk) => {
    str += chunk;
});

//读取完成后触发
readStream.on('end', (chunk) => {
    console.log(str);
});

//读取失败
readStream.on('error', (error) => {
    console.log(error);
});