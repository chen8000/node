
//获取后缀名模块
const path = require('path');
const fs = require('fs');


//事件广播和接收
// const events = require('events');
// const EventsEmitter = new events.EventEmitter();




exports.rmPoint = (getName) => {

    //得到文件后缀名，
    let extname = path.extname(getName);

    // 读取所有格式的文件的一个json文件(异步-- 事件广播和接收)
    // fs.readFile('mime.json', 'utf8', (err, stats) => {
    //     if(err){
    //         console.log(err);
    //         return;
    //     }
    //     //广播事件
    //     EventsEmitter.emit('to_parent', stats);
        
    // });
    
    // //接收广播事件
    // EventsEmitter.on('to_parent', (stats) => {
        
    //     return JSON.parse(stats.toString())[extname];
    // }); 

    //同步
    let stats = fs.readFileSync('../mime/mime.json', 'utf8');

    return JSON.parse(stats.toString())[extname] || 'text/html';
}


