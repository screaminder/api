'use strict';

const Q = require('q');
const express = require('express');
const cors = require('cors');
const statusReq = require('./actions/status.js');

const app = express();

function onError(err, req, res, next) {
    res.statusCode = 500;
    res.status(500).json({error_message: 'something went wrong'});
}

//actions
app.get('/status', statusReq.get);

// error handler
app.use(onError);


app.listen(process.env.PORT, () => {
  console.log('Started slack-api on port ' + process.env.PORT);
});
