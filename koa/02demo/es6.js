




//asycn 让一个方法变成异步方法

// await 等待这个异步方法执行完


async function getDate () {
    return `这是一个异步方法`
}

let p = getDate();

//获取异步函数的方法一
p.then((data) => {
    console.log(data)
})


// 声明一个异步函数
async function getDate2() {
    return `222222`;
}

// 获取这个异步函数里返回的数据
async function getDate2D(){
    let p = await getDate2();

    console.log(p);
}
// 调用获取异步函数里的数据
getDate2D();











