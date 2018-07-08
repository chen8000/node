
const router = require('koa-router')();
const DB = require('../../module/db');
const tools = require('../../module/tools');
const upload = tools.storage('public/logo');
const dbName = 'setting';


router.get('/', async (ctx) => {

    let result = await DB.find(dbName, [{}]);

    ctx.render('admin/setting/index', { result });
});

router.post('/doEdit', upload.single('logo'), async (ctx) => {

    let result = ctx.req.body;
    let id = result.id;
    let title = result.title;
    let keywords = result.keywords;
    let description = result.description;
    let icp = result.icp;
    let qq = result.qq;
    let tel = result.tel;
    let address = result.address;
    let status = result.status;
    let update_time = new Date();
    let logo = ctx.req.file ? ctx.req.file.path : '';
    let json = { title, keywords, description, icp, qq, tel, address, status, update_time };
    if(logo != ''){
        json.logo = logo.substr(7);
    };
    
    await DB.update(dbName, {"_id":await DB.ObjectID(id)}, json);

    ctx.redirect(ctx.state.G.prevPage);

})


/*
    title  - 标题
    logo   - logo
    keywords  - 关键字
    description - 描述
    icp  - 备案号
    qq  - 客服qq
    tel - 电话
    address - 是否关闭网站
    status - 状态
    add_time - 添加时间



    await DB.insert(dbName, {
        title:"chen1",
        logo:"",
        keywords:"",
        description:"123",
        icp:'123',
        qq:"123",
        tel:"123",
        address:"123",
        status:"123",
        add_time:"333"
    });
*/ 


module.exports = router.routes();











