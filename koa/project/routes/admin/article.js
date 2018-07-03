
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
                filename:ctx.req.file.filename, // 返回上传后的文件名
                body:ctx.req.body
            }
            
        })

3.模版页面的form里要写个属性  enctype="multipart/form-data"

*/ 

const router = require('koa-router')();
const multer = require('koa-multer');
const DB = require('../../module/db');

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

// 列表页
router.get('/list', async (ctx) => {

    // page 第几页  pageSize:每页显示多少条， 默认10条
    let page = ctx.query.page; // 第几页
    let pageSize = 10; // 每页显示多少条
    let result = await DB.find('user', [{}], { page, pageSize}); // 根据page查询对应数据
    let count = await DB.count('user',{}); //总数量
    let counts = count / pageSize;



    await ctx.render('admin/article/list', { result , page, pageSize, counts});
});

// 增加内容页面
router.get('/add', async (ctx) => {

    await ctx.render('admin/article/add');
    
});

// 提交地址
router.post('/doAdd', upload.single('pic'), async (ctx) => {

    ctx.body = {
        filename:'', // 返回的文件名
        body:ctx.req.body
    }
    
});


// 百度富文本编辑器
router.get('/ueditor', async (ctx) => {

    await ctx.render('admin/article/ueditor');
})



module.exports = router.routes();












