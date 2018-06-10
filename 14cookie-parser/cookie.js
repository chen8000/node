
const express = require('express');
const app = express();
app.listen(8000,'127.0.0.1');

const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/', (request, response) => {
    response.send('hello cookieParser');
})