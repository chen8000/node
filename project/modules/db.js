

const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017/productmanage';

let _connectDb = (collback) => {

    MongoClient.connect(dbUrl, (err, db) => {

        if(err){
            console.log(err);
            console.log('数据库链接失败');
            return;
        }

        // 增  删  改  查
        collback(db);
        
    })
};

exports.find = (collectionName, json, collback) => {

    _connectDb((db) => {
        //查
        let result = db.collection(collectionName).find(json);

        
        result.toArray((err, data) => {

            if(err){
                console.log(err);
                return;
            }
            // 回调函数，把数据和err传回去
            collback(data);

            
        });

        //关闭数据库
        db.close();
    });
};