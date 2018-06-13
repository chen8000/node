

const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017/productmanage';

const ObjectID = require('mongodb').ObjectID;

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

module.exports = {

    //增
    insert: (collectionName, json, collback) => {

        _connectDb( (db) => {
    
            db.collection(collectionName).insertOne(json, (err, data) => {
                if(err){
                    console.log(err);
                    return;
                }
                collback(data);
    
                //关闭数据库
                db.close();
            });
        });
    },

    //删
    delete: (collectionName, json, collback) => {

        _connectDb( (db) => {
    
            db.collection(collectionName).deleteOne(json, (err, data) => {
                if(err) {
                    console.log(err);
                    return;
                }
                
                collback(data);
    
                //关闭数据库
                db.close();
            })
        });
    },

    //改
    update: (collectionName, json1, json2, collback) => {

        _connectDb( (db) => {
            db.collection(collectionName).updateOne(json1, {$set:json2}, (err, data) => {
    
                if(err){
                    console.log(err);
                    return;
                }
    
                collback(data);
    
                //关闭数据库
                db.close();
            })
        });
    },

    //查
    find: (collectionName, json, collback) => {

        _connectDb( (db) => {
            //查
            let result = db.collection(collectionName).find(json);
    
            
            result.toArray((err, data) => {
    
                if(err){
                    console.log(err);
                    return;
                }
                // 回调函数，把数据和err传回去
                collback(data);
    
                //关闭数据库
                db.close();
            });
        });
    },

    // 暴露 ObjectID 用来获取数据库里的 _id （自增id）
    ObjectID

    //--
};

