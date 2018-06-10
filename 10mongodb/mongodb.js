const http = require('http');
const url = require('url');

const ejs = require('ejs');

//自定义路由模块


//自定义路由模块
const app = require('./module/expressRouter');

// console.log(app())

http.createServer(app).listen(8000);
console.log('server running at 127.0.0.1:8000');

//登陆页面
app.get('/login', (request,response) => {
    // console.log('login');
    console.log('调用了login');

    //模拟数据
    let data = '我是从后台数据库里查出来的数据';

    let passData = {
        h:'<h2>这个是一个h2标签</h2>',
        msg:data,
        list:[
            {
                name:'zhenghui.chen',
                age:'18',
                happy:'666'
            }
        ]
    }

    ejs.renderFile('./views/login.ejs', passData, (err, data) => {

        response.send(data);
    }); 
});

//登陆成功页面
app.post('/dologin', (request,response) => {
    
    response.send(request.body);
});


//首页
app.get('/', (request, response) => {
    ejs.renderFile('./views/index.ejs', {}, (err, data) => {
        response.send(data); 
    })
})







