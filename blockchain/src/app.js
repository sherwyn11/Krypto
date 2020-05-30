const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routers/router');

const app = express()

app.use(bodyParser.urlencoded({extended : false}));
app.use(route)

module.exports = app;