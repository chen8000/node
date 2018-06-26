

let app = {

    toggle : (_this, collectionName, status, id) => {

        $.ajax({
            url:'/admin/changeStatus',
            type:'get',
            data:{ collectionName, status, id},  // 数据库表名， 字段名status, 表id
            dataType:'json',
            success:(result) => {

                // console.log(result)   //获取后台数据
                
                let classType = $(_this).find('i').hasClass('icon-ok');

                if(classType){
                    $(_this).find('i').attr('class','icon-remove bigger-120 success');
                    $(_this).attr('class','btn btn-xs btn-danger')
                }else{
                    $(_this).find('i').attr('class','icon-ok bigger-120 success');
                    $(_this).attr('class','btn btn-xs btn-success')
                }
            },
            error: (err) => {
                
            }
        })

    }

}










