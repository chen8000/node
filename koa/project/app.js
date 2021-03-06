


const koa = require('koa');
const router = require('koa-router')();
const static = require('koa-static');
const path = require('path');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const app = new koa();
const render = require('koa-art-template');
const sd = require('silly-datetime');
const jsonp = require('koa-jsonp'); 
const cors = require('koa2-cors');

// 子路由模块 -admin
const index = require('./routes/index');
const admin = require('./routes/admin');
const api = require('./routes/api');

//配置中间件
render(app, {
    root : path.join(__dirname, 'views'), // 视图引擎的位置
    extname : '.html',  // 后缀名
    debug : process.env.NODE_ENV !== 'production',  // 是否开启调试模式
    dateFormat: dateFormat = (value) => {
        return sd.format(value, 'YYYY-MM-DD HH:mm');  //格式化日期
    }   
});
// 配置session中间件
app.keys = ['some secret hurr'];
const CONFIG = {
    key: 'koa:sess',
    maxAge: 864000*10000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: true,
    renew: false,
};
app.use(session(CONFIG, app));

//post
app.use(bodyParser()); //配置中间件

// 配置静态资源
app.use(static(__dirname + '/public'));

// jsonp 中间件
app.use(jsonp());

// 后台允许跨域
app.use(cors());



//后台首页
router.use('/admin', admin);

//api
router.use('/api', api);

//前台首页  默认加载index
router.use(index);



//启动路由
app
    .use(router.routes()) // 启动路由
    .use(router.allowedMethods()); //  根据上下文环境配置 response 响应头


app.listen(8000);






