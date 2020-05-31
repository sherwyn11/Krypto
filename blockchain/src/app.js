const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./routers/authRouter');
const apiRouter = require('./routers/apiRouter');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(bodyParser.json({extended : false}));
app.use(authRouter);
app.use(apiRouter);

module.exports = app;