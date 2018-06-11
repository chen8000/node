

let app = {
    //从目录或文件数组里删除.DS文件
    removeDs:(res) => {
        
        // findIndex 接收三个参数
        // 第一个参数  数组当前的value
        // 第二个参数  当前数组元素的下标
        // 第三个参数  当前遍历的数组
        let Ds_index = res.findIndex((value, index, arr) => {
            return value == '.DS_Store';
        });

        //如果有这个文件，那么删除这个数组元素
        if(Ds_index >= 0){
            res.splice(Ds_index,1)
        }
    },

    
}

module.exports = app;