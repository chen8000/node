

let app = {

    toggle : (el, collectionName, attr, id) => {

        $.ajax({
            url:'/admin/changeStatus',
            type:'get',
            data:{ collectionName, attr, id},
            dataType:'json',
            success:(result) => {
                console.log(result)
            },
            error: (err) => {

            }
        })

    }

}










