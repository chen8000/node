
//获取后缀名模块
const path = require('path');

module.exports = (getName) => {
    //得到文件后缀名，
    let extname = path.extname(getName);
    //截取字符串
    switch(extname){
        case '.html' :
            return 'html';
        case '.css' :
            return 'css';
        case '.js' :
            return 'javascript';
        default :
            return 'html';        
    }
}


