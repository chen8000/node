
const http = require('http');
const router = require('../module/router');

//创建服务
http.createServer((request, response) => {
    
    router.statics(request,response,'static');
    
}).listen(8000);

console.log('server running at 127.0.0.1:8000');








