const router = require('koa-router')();
const DB = require('../../module/db');




// 成功案例case
router.get('/', async (ctx) => {
    let maxClassification = await DB.find("articlecate", [{"pid":"5b345495518729038178f082"}]);

    // 大分类是个集合
    // 小分类是个集合（把小分类库里的数据都显示出来）
    // 点击大分类时带过来大分类的id  去小分类库里去查询 把对应的内容查出来
    

    // let minClassification = await DB.find('article', [{}]);

    await ctx.render('index/case', { maxClassification });
});

// 服务行业  service

// 教育行业  education

// 房地产行业  property

// 能源行业  energy




module.exports = router.routes();



