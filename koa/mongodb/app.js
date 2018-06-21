

// const MongoClient = require('mongodb').MongoClient;

// const dbUrl = 'mongodb://127.0.0.1:27017';

// const dbName = 'koa';

const db = require('./module/db');


// db.find('user',{}).then((err, data) => {

//     if(err){
//         console.log(err);
//     }else{
//         console.log(data);
//     }
// });

// let result = db.insert('user',{
//             'username':"lisi666",
//             "age":28,
//             "sex":'男',
//             "status":1
//         }).then((res) => {
//             //拿到增加的数据
//             console.log(res);
//         });

db.update('user', {'username':"lisi666"}, {'sex':'女'}).then((res) => {
    console.log(res.result)
})

        // console.log(result.ops)

// MongoClient.connect(dbUrl, (err, client) => {

//     if(err){
//         console.log(err);
//         console.log('连接数据库失败');
//         return;
//     }
//     const db = client.db(dbName);  // 指定db表

    //增加数据
    // db.collection('user').insertOne(
    //     {
    //         'username':"lisi",
    //         "age":28,
    //         "sex":'男',
    //         "status":1
    //     },
    //     (err, result) => {
    //         if(!err){
    //             console.log('增加数据成功！');
    //             client.close();
    //         }
    //     });

    //查询数据
//    let result = db.collection('user').find();

//    result.toArray((err, data) => {
//        console.log(data);
//    });
// })











