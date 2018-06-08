
//获取后缀名模块
const path = require('path');

module.exports = (getName) => {
    //得到文件后缀名，
    let extname = path.extname(getName);
    //截取字符串
    return extname.slice(1) === 'js' ? 'javascript':extname.slice(1);
}


