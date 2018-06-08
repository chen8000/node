//  写入流
var fs = require('fs');


//模拟数据
var data = `请把我写到output.txt里，谢谢，zhanghui.chen 666`;


//把数据写入到output.txt里
var writeStream = fs.createWriteStream('output.txt');


//写入数据，指定数据的编码格式
writeStream.write(data, 'utf8');

//标记写入完成（写入完成后会广播一个finish事件）
writeStream.end();

//接收finish事件
writeStream.on('finish', () => {
    console.log('写入完成');
});

//写入失败
writeStream.on('error', () => {
    console.log('写入失败');
})

 

