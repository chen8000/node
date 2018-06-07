
var tools = {
    add : (x,y)=>{
        return x+y;
    },
    sayHello:()=>{
        return 'hello nodejs'
    }
};

//暴露 tools 提供外部使用
module.exports = tools;