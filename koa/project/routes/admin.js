



/*
ueditor富文本编辑器

--前台使用--
1.前台页面使用 需要从github上下载js文件  koa2-ueditor/example/public/ueditor
2.把ueditor文件夹放到静态目录下
3.页面头部引入js
    <script type="text/javascript" charset="utf-8" src="/ueditor/ueditor.config.js"></script>
    <script type="text/javascript" charset="utf-8" src="/ueditor/ueditor.all.min.js"> </script>
    <script type="text/javascript" charset="utf-8" src="/ueditor/lang/zh-cn/zh-cn.js"></script>

4.把下面这个标签放到需要渲染富文本的地方
<script id="editor" type="text/plain" style="width:100%;height:300px;"></script>
5. 配置  【getEditor传入的参数是渲染编辑器的script的id】
    var ue = UE.getEditor('editor');


--后台配置--    
4. 后台安装koa2-ueditor模块
5. 引入 const ueditor = require('koa2-ueditor');
6. router.all('/editor/controller', ueditor('public')); // public为服务器静态目录
7. 配置图片上传  
router.all('/editor/controller', ueditor(['public', {
	"imageAllowFiles": [".png", ".jpg", ".jpeg"], 配置可以上传的img格式
	"imagePathFormat": "/upload/ueditor/image/{yyyy}{mm}{dd}/{filename}"  // 保存为原文件名
}]));
8. 配置服务器统一请求接口路径
在 public/ueditor/ueditor.config.js
serverUrl 后面的路径

*/ 

const router = require('koa-router')();
const url = require('url');
const ueditor = require('koa2-ueditor');

//子模块
const login = require('./admin/login');
const user = require('./admin/user');
const manage = require('./admin/manage');
const index = require('./admin/index');
const articlecate = require('./admin/articlecate');
const article = require('./admin/article');

// 配置富文本
router.all('/editor/controller', ueditor('public'));
router.all('/editor/controller', ueditor(['public', {
	"imageAllowFiles": [".png", ".jpg", ".jpeg"],
	"imagePathFormat": "/upload/ueditor/image/{yyyy}{mm}{dd}/{filename}"  // 保存为原文件名
}]))


//判断用户是否登陆
router.use(async (ctx, next) => {

    let pathname=url.parse(ctx.request.url).pathname.substring(1);

    let splitUrl = pathname.split('/');
    
    // 配置全局用户信息
    ctx.state.G = {

        url:splitUrl,
        userInfo:ctx.session.userinfo,
        prevPage:ctx.request.headers['referer']
    }
    ctx.state.__HOST__='http://'+ctx.request.header.host;
    //   如果用户登陆，继续向下执行
    //   如果没有登陆, 跳转到登陆页面



    //权限判断
    if(ctx.session.userinfo){
        await  next();
    }else{  //没有登录跳转到登录页面
        if(pathname=='admin/login' || pathname=='admin/login/doLogin' || pathname == 'admin/login/code'){
            await  next();
        }else{
            ctx.redirect('/admin/login');
        }
    }
})



router.use(index);
router.use('/user', user);
router.use('/login', login);
router.use('/manage', manage);
router.use('/article', article);
router.use('/articlecate', articlecate);




/*
 一级分类 pid:0  _id:''   // _id 为自动生成

 一级分类下的二级分类   pid == 一级分类的_id

 

*/ 
// 




module.exports = router.routes();















