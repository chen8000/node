
// zhanghui.chen  666
const http = require('http');
const ejs = require('ejs');
const url = require('url');

//************  注意数据库格式 2.2.30
const mongoClient = require('mongodb').MongoClient; //引入mongodb

//数据库的连接地址  chen是数据库的名称
const dbUrl = 'mongodb://localhost:27017/chen';
 
//自定义路由模块
const app = require('./module/expressRouter');

// console.log(app())
http.createServer(app).listen(8000);
console.log('server running at 127.0.0.1:8000');



//定义一个增加数据的路由
//增加
app.get('/add', (request, response) => {
    //连接数据库
    mongoClient.connect(dbUrl, (err, db) => {
        //如果连接失败
        if( err ){
            console.log( err );
            console.log( '连接数据库失败' );
        }
        //给user表里添加数据
        //两个参数，第一个表示要增加的数据，第二个回调函数
        db.collection( 'user' ).insert( {
            "name":"张昌",
            "age":26

        }, (err, result) => {
            if( err ) {
                console.log(err);
                console.log("增加数据失败");
            }
            console.log(result.ops)//打印出数据
            response.send('good 666');

            db.close();//最后需要关闭数据库
        })
    })
});

//修改
app.get('/edit', (request, response) => {
    
    //连接数据库
    mongoClient.connect(dbUrl, (err, db) => {

        if(err){
            console.log(err);
            return;
        }

        //修改数据
        db.collection('user').updateOne({"name":"chen"},{$set:{'age':41}}, (err, update) => {
            if(err){
                console.log(err);
                return ;
            }
            console.log('修改数据成功');
            console.log(update)
            response.send();
            db.close();
        })

    });

})
 
//删除
app.get('/delete', (request, response) => {

    //获取到url后面的参数
    let getQuery = url.parse(request.url,true).query;
    

    

    //连接数据库
    mongoClient.connect(dbUrl, (err, db) => {
        if(err){
            console.log(err);
            return;
        }

        //删除数据
        db.collection('user').deleteOne({"name":getQuery.name}, (err, result) => {
            if(err){
                console.log(err);
                return;
            }
            console.log('删除数据成功');

            db.close();
        })
    })

    response.send();
})



//查
app.get('/find', (request, response) => {
    mongoClient.connect(dbUrl, (err, db) => {
        if(err){
            console.log(err);
            console.log('连接数据库失败');
        }
        let list = [];
        let result = db.collection('user').find();

        //需要循环得到数据
        result.each((err,doc) => {
            if(err){
                console.log(err);
            }else{
                //doc就是查询出来的数据
                if(doc != null){
                    list.push(doc);
                }else{
                    //循环完成后打印出查询出来的数据
                    console.log(list);

                    //渲染模版，把数据库里的模版渲染到find模版
                    ejs.renderFile('./views/find.ejs', {list:list}, (err, data) => {
                        if(err){
                            console.log(err);
                            return;
                        }
                        response.send(data);
                    })
                }
            }
        });

    })
})




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







