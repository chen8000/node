
/*
 ---- 上传图片 ----
 需要依赖模块 koa-multer

 1.配置
        // 配置multer模块 上传图片
        let storage = multer.diskStorage({
            destination:(req, file, cb) => {
                cb(null, 'public/upload') // 配置上传图片的目录[主意图片上传的目录必须存在]
            },
            filename:(req, file, cb) => {
                let fileFormat = (file.originalname).split('.'); // 把原图片名字分割成数组
                cb(null, `${file.fieldname}-${Date.now()}.${fileFormat[fileFormat.length-1]}`) // 定义图片上传后的名字
            }
        })
        
        let upload = multer({ storage })
        
2.接收数据的路由 要写 upload.single('pic') 参数， pic是模版文件里上传图片的input的name
        // 提交地址
        router.post('/doAdd', upload.single('pic'), async (ctx) => {

            ctx.body = {
                // 返回上传后的文件名
                filename:ctx.req.file ? ctx.req.file.filename : '',
                body:ctx.req.body
            }
        })

3.模版页面的form里要写个属性  enctype="multipart/form-data"

*/ 

const router = require('koa-router')();
const multer = require('koa-multer');
const DB = require('../../module/db');
const tools = require('../../module/tools');
const dbName = 'article';

// 配置multer模块 上传图片
let storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, 'public/upload') // 配置上传图片的目录[主意图片上传的目录必须存在]
    },
    filename:(req, file, cb) => {
        let fileFormat = (file.originalname).split('.'); // 把原图片名字分割成数组
        cb(null, `${file.fieldname}-${Date.now()}.${fileFormat[fileFormat.length-1]}`) // 定义图片上传后的名字
    }
  })
  
  let upload = multer({ storage })


// 首页
router.get('/', async (ctx) => {

    await ctx.redirect(`${ctx.state.__HOST__}/admin/article/list?page=1`)
}) 

// 列表页
router.get('/list', async (ctx) => {

    // page 第几页  pageSize:每页显示多少条， 默认10条
    let page = ctx.query.page; // 第几页
    let pageSize = 10; // 每页显示多少条
    let result = await DB.find(dbName, [{}, {}, {"sort":-1}], { page, pageSize}); // 根据page查询对应数据

    // 把分类查出来
    let catename = await DB.find('articlecate', [{}]);

    // 循环分类 判断如果分类的_id和文章列表的pid一样 证明这个分类就是当前这条文章的分类
    for(let i = 0; i<catename.length; i++){
        for(let n = 0; n<result.length; n++){
            if(catename[i]._id == result[n].pid){
                result[n].catename = catename[i].title;
            }
        }
    }

    

    let count = await DB.count(dbName, {}); //总数量
    let counts = Math.ceil(count / pageSize);// 需要取整数

    await ctx.render('admin/article/list', { result , page, pageSize, counts});
});

// 增加内容页面
router.get('/add', async (ctx) => {

    let result = await tools.D2(await DB.find('articlecate',[{}]));

    await ctx.render('admin/article/add', { result });
    
});

// 提交地址
router.post('/doAdd', upload.single('pic'), async (ctx) => {

    // 分类名称
    let catename = ctx.req.body.catename;
    // pid存的是分类的_id
    let pid = ctx.req.body.pid;
    // 名称
    let title = ctx.req.body.title;
    // 封面图
    let pic = ctx.req.file ? ctx.req.file.path.substr(7) : '';
    // 作者
    let author = ctx.req.body.author;
    // 状态
    let status = ctx.req.body.status;
    // --精品
    let is_best = ctx.req.body.is_best || '0';
    // --热销 
    let is_hot = ctx.req.body.is_hot || '0';
    // --新品
    let is_new = ctx.req.body.is_new || '0';
    // 文章编辑
    let content = ctx.req.body.content ? ctx.req.body.content : '';
    // 关键字
    let keywords = ctx.req.body.keywords;
    // 描述
    let description = ctx.req.body.description;
    // 发布时间
    let start_time = new Date();
    // 总条数
    let sort = await DB.count(dbName, {}); //总数量

    let json = {catename, pid, title, pic, author, status, is_best, is_hot, is_new, content, keywords, description, start_time, sort}

    // 存数据
    await DB.insert(dbName, json);

    // 刷新页面
    ctx.redirect(`${ctx.state.__HOST__}/admin/article`);
    
});

// 编辑
router.get('/edit', async (ctx) => {

    let result = await DB.find(dbName, [{"_id":await DB.ObjectID(ctx.query.id)}]);

    let catename = await tools.D2(await DB.find('articlecate', [{}]));

    let prevPage = ctx.state.G.prevPage;

    ctx.render('admin/article/edit',{result, catename , prevPage});
});

// 编辑完提交
router.post('/doEdit', upload.single('pic'), async (ctx) => {



    let result = ctx.req.body;
    let id = result.id;

    // 分类名称
    let catename = result.catename;
    // pid存的是分类的_id
    let pid = result.pid;
    // 名称
    let title = result.title;
    // 封面图
    let pic = ctx.req.file ? ctx.req.file.path : '';
    // 作者
    let author = result.author;
    // 状态
    let status = result.status;
    // --精品
    let is_best = result.is_best || '0';
    // --热销 
    let is_hot = result.is_hot || '0';
    // --新品
    let is_new = result.is_new || '0';
    // 文章编辑
    let content = result.content ? result.content : '';
    // 关键字
    let keywords = result.keywords;
    // 描述
    let description = result.description;
    // 发布时间
    let start_time = new Date();



    let json = {catename, pid, title, author, status, is_best, is_hot, is_new, content, keywords, description, start_time}

    
    if(pic != ''){
        json.pic = pic.substr(7);
    }

    await DB.update(dbName, {"_id":await DB.ObjectID(id)}, json);

    ctx.redirect(result.prevPage);
});


// 删除
router.get('/remove', async (ctx) => {

    await DB.remove(dbName, {"_id":await DB.ObjectID(ctx.query.id)});

    ctx.redirect(ctx.state.G.prevPage);
})




// 百度富文本编辑器
router.get('/ueditor', async (ctx) => {

    await ctx.render('admin/article/ueditor');
});



module.exports = router.routes();












