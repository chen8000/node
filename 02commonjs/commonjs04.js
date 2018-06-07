


// foo 在node_modules文件夹里，但是导入的时候并没有使用./node_modules/foo 的路径
// node在本地文件夹里找不到模块时，会到node_modules里找
// 所以这里就拿到了foo模块

var foo = require('foo');

console.log(foo);