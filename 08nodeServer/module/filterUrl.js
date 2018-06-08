

//过滤掉url后面带的参数

const url = require('url');

module.exports = (requestUrl) => {
    return url.parse(requestUrl).pathname;
}


