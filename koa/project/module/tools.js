
const md5 = require('md5-node');
const multer = require('koa-multer');


const toos = {
    
    // md5加密
    md5(str){
        return md5(str);
    },

    // 配置图片上传 模块 multer
    storage(path){
        // 配置multer模块 上传图片
        let storage = multer.diskStorage({
            destination:(req, file, cb) => {
                cb(null, path) // 配置上传图片的目录[主意图片上传的目录必须存在]
            },
            filename:(req, file, cb) => {
                let fileFormat = (file.originalname).split('.'); // 把原图片名字分割成数组
                cb(null, `${file.fieldname}-${Date.now()}.${fileFormat[fileFormat.length-1]}`) // 定义图片上传后的名字
            }
        })
        
        return multer({ storage });

    },

    // 根据pid把数据分类，返回一个二维数组
    D2(result){

        // console.log(result)

        let len = result.length;
        let newArr1 = [];
        let newArr2 = [];
        

        //循环一级数据
        for(let i = 0; i<len; i++){
            // 把一级挑出来 放到arr1
            if(result[i].pid == '0'){
                newArr1.push(result[i]);
            }else{
                // 剩下的放到 arr2
                newArr2.push(result[i]);
            }
        }

        //循环二级数据
        for(let i = 0; i<newArr1.length; i++){
            newArr1[i].list = [];
            for(let n = 0; n< newArr2.length; n++){
                
                // 把二级分类到一级下的list里
                if(newArr2[n].pid == newArr1[i]._id){
                    newArr1[i].list.push(newArr2[n])
                }
            }
        }

        // 返回最终数组
        return newArr1;
    }

}


module.exports = toos;






