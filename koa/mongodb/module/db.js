


// db 库
const MongoClient = require('mongodb').MongoClient;

const config = require('./config');


class Db {

    // 单例   多个实例共享
    static getInstance(){
        if(!Db.instance){
            Db.instance = new Db();
        }

        return Db.instance;
    }

    // 构造函数
    constructor () {

        //初始化的时候链接数据库
        this.connect();

        this.dbClient = '';
        
    }

    // 连接数据库
    connect () {

        return new Promise((resolve, reject) => {

            if(!this.dbClient){
                //链接数据库
                MongoClient.connect(config.dbUrl, (err, client) => {

                    if(err){
                        reject(err);
                        
                    }else{
                        
                        // 连接成功后把db对象保存到this.dbClient里
                        this.dbClient = client.db(config.dbName);
                        resolve(this.dbClient);
                    }
                })
            }else{
                resolve(this.dbClient);
            }
            
        })
    }

    // 查询
    find(collectionName, json){
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                let result = db.collection(collectionName).find(json);
    
                result.toArray((err, data) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(data);
                    }
                })
            })
        })
        
    }

    // 修改
    update(){

    }

    //增加
    insert(){

    }


}


module.exports = Db.getInstance();








