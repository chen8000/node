


const express = require('express');
const app = new express();

app.listen(8000,'127.0.0.1');

app.get('/', (request,response) => {


    response.send('zhanghui.chen 666');
});