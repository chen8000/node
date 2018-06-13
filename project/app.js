

// zhanghui.chen -- 666


const express = require('express');
const app = express();
const session = require('express-session');
const md5 = require('md5-node');// md5加密
const fs = require('fs');

//获取post提交的数据
const bodyParser = require('body-parser');

//图片上传模块
const multiparty = require('multiparty');

//链接数据库
const db = require('./modules/db');


//使用ejs模版引擎
app.set('view engine', 'ejs');

//配置中间件
app.use(express.static('static'));
app.use('/upload',express.static('upload'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//配置session的中间件
app.use(session({
    secret:'zhanghui666', // 加密session的随机字符串，随便写
    name:'userId', // 设置返回客户端的key 默认是connect.sid   
    resave:false, // 默认为true 表示不管session有没有变化都保存，false表示有变化才保存
    saveUninitialized:true, // 强制把未初始化的session存储 默认设置为true 建议设置成true

    //cookie的所有参数都可以设置到这里 
    cookie:{
        secure:false,
        maxAge:1000*60*30  //设置过期时间
    }, //secure:true 表示只有在https协议下才可以访问这个cookie

    rolling:true, // 每次用户刷新也就后重新设置cookie时间，只要用户在过期时间内刷新的页面，
                // cookie就不会过期，过期时间从用户最后一次刷新开始计算

    //把 session存储到数据库             
    // store : new MongoStore({
        // url:'mongodb://127.0.0.1:27017/student',
        // touchAfter: 24 * 3600   // 这个熟悉表示在24小时内无论有多少次请求，数据是不会变的，除非你更改了这个数据
    // })            
}));


//自定义中间件，判断用户是否登陆
app.use((request, response, next) => {

    if(request.url == "/login" || request.url == '/doLogin'){
        
        next();
    }else{
        //判断有没有登陆
        
        if(request.session.userInfo && request.session.userInfo.username !== ''){
            
            //设置全局数据
            app.locals['userinfo'] = request.session.userInfo;
            
            next();
        }else{
            response.redirect('/login');
        }
    } 
});



// 用户登陆的路由
app.get('/login', (request, response) => {

    response.render('login');

    // response.send('login--用 户登陆');
});

// doLogin  获取登陆提交的数据
app.post('/doLogin', (request, response) => {

    //1. 获取数据
    // let getPost = request.body;

    //对密码进行加密
    request.body.password = md5(request.body.password);

    //查询数据
    db.find('user', request.body, (data) => {
        
        if( data.length > 0 ){
            console.log('登陆成功');

            //登陆成功后保存用户信息
            request.session.userInfo = data[0];
            //跳转页面
            response.redirect('/product');
            
            
        }else{
            console.log('登陆失败');

            response.send(`<script>alert('登陆失败'); location.href='/login'</script>`);
        }
    });
});


//商品列表
app.get('/product', (request, response) => {
    //去数据库里查数据
    
    db.find('product', {}, (data) => {
        
        response.render('product', {list:data});
    });
});



//增加商品列表
app.get('/productadd', (request, response) => {

    //实现图片上传


    response.render('productadd');

    // response.send('productAdd--增加商品列表');
});

//获取提交的数据
app.post('/doProductAdd', (request, response) => {

    //获取提交的数据以及图片信息
    const form = new multiparty.Form();

    form.uploadDir = 'upload' //图片保存的地址

    form.parse(request, function(err, fields, files) {

        if(err){
            console.log(err);
            return;
        }

        // fields  表单提交上来的信息
        // files 图片上传成功后提交的信息

        // 获取数据
        //  { title: [ '商品描述:' ],
        //   price: [ '商品描述:' ],
        //   fee: [ '商品描述:' ],
        //   description: [ '商品描述:' ] }

        //提交过来的信息
        let _files = {
            title : fields.title[0],
            price : fields.price[0],
            fee : fields.fee[0],
            description : fields.description[0],
            pic : files.pic[0].path
        };

        //把信息保存到数据库里
        db.insert('product', _files, (data) => {
            
            
        })

        // 图片信息(地址)

        response.redirect('productadd');

        // 图片信息
        // { pic:[ { fieldName: 'pic',
        //        originalFilename: '175_03.png',
        //        path: 'upload/6AL02SHRrm2KnU21W8vfDNmw.png',
        //        headers: [Object],
        //        size: 237946 } 
            //] }

        
      
        //获取提交的数据以及图片上传成功后返回的图片信息
    });
})


//编辑商品
app.get('/productedit', (request, response) => {
    
    //根据数据库里的自增id查询数据需要使用  ObjectID 模块
    
    db.find('product', {"_id":new db.ObjectID(request.query.id)}, (data) => {

        response.render('productedit', {list:data[0]});
    })
    // response.send('productedit--编辑商品');
});

// 编辑完成后提交一个地址
app.post('/doProductEdit', (request, response) => {


    //获取提交的数据以及图片信息
    const form = new multiparty.Form();

    form.uploadDir = 'upload' //图片保存的地址

    form.parse(request, function(err, fields, files) {

        if(err){
            console.log(err);
            return;
        }

        // fields  表单提交上来的信息
        // files 图片上传成功后提交的信息

        // 获取数据
        //  { title: [ '商品描述:' ],
        //   price: [ '商品描述:' ],
        //   fee: [ '商品描述:' ],
        //   description: [ '商品描述:' ] }

        //提交过来的信息
        let _files = {
            title : fields.title[0],
            price : fields.price[0],
            fee : fields.fee[0],
            description : fields.description[0],
            pic : ((path)=>{

                //判断是否修改了图片
                //如果没有修改，图片地址为原图片地址
                if(!files.pic[0].originalFilename){

                    //删除生成的无用图片
                    fs.unlink(files.pic[0].path, (err) => {
                        if(err){
                            console.log(err);
                        }
                    });
                    
                    return fields.picOriginal[0];
                    //如果修改了就拿最新的地址
                }else{
                    return path;
                }
                
            })(files.pic[0].path)
        };


        //修改数据
        db.update('product', {"_id":new db.ObjectID(fields._id[0])}, _files, (data) => {
            
            // console.log(data)

            response.redirect('product');
        })

        // 图片信息(地址)

        

        // 图片信息
        // { pic:[ { fieldName: 'pic',
        //        originalFilename: '175_03.png',
        //        path: 'upload/6AL02SHRrm2KnU21W8vfDNmw.png',
        //        headers: [Object],
        //        size: 237946 } 
            //] }

        
      
        //获取提交的数据以及图片上传成功后返回的图片信息
    });
})


//删除商品
app.get('/productdelete', (request, response) => {


    //删除服务器上的图片
    fs.unlink(request.query.picPath, (err) =>{
        if(err){
            console.log(err);
        }
    });
    
    //删除数据
    db.delete('product', {'_id':new db.ObjectID(request.query.id)}, (data) => {
        response.redirect('/product');
    });


    // response.send('productdelete--删除商品')
});

//退出登陆
app.get('/loginOut', (request, response) => {
    
    request.session.destroy((err) => {
        if(err){
            console.log(err);
        }
        response.redirect('/login');
    });
});

app.listen(8000,'127.0.0.1');








