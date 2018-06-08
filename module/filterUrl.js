

//过滤掉url后面带的参数

const url = require('url');

exports.filterParameter = (requestUrl) => {
    return url.parse(requestUrl).pathname;
}


