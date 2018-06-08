



//以管道流的方式写入数据

const fs = require('fs');

//读取数据
let readStream = fs.createReadStream('input.txt');
//写入数据
let writeStream = fs.createWriteStream('output.txt');


//以管道流的方式把数据写入到output.txt文件里
readStream.pipe(writeStream);

console.log('写入完成');





