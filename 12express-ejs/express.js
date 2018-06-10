

const express = require('express');

const app = new express();

// 配置模版引擎  默认会到views目录下找模版文件
app.set('view engine', 'ejs');

//修改模版文件路径  修改模版路径为static下找模版文件
// app.set('views', _dirname + '/static');

//配置静态服务
app.use(express.static('static'));

//配置虚拟目录的静态服务
app.use('/public',express.static('static'))


//监听8000端口
app.listen(8000,'127.0.0.1');

app.get('/', (request, response) => {

    // response.send('express--ejs');

    //渲染ejs模版,第一个参数是模版引擎的路径
    //第二个参数是渲染到模版上的数据
    //第三个参数是回调函数
    response.render('index');

});

app.get('/news', (request, response) => {

    let list = ['zhanghui','666'];

    response.render('news', {
        list:list
    })
})

