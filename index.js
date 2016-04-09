'use strict';

const Q = require('q');
const express = require('express');
const cors = require('cors');
const statusReq = require('./actions/status.js');
const MongoDB = require('./db/mongoDB.js');
const bodyParser = require('body-parser');

const mongoClient = new MongoDB(process.env.MONGOLAB_URI);
const app = express();

const userAuth = require('./actions/auth.js')(mongoClient);

function onError(err, req, res, next) {
    console.log(err);
    res.statusCode = 500;
    res.status(500).json({error_message: 'something went wrong'});
}


//actions
app.use(cors());
app.get('/status', statusReq.get);
app.post('/auth', bodyParser.json(), userAuth.post);

// error handler
app.use(onError);

Q.all([mongoClient.connectAsync()]).then(() => {
  app.listen(process.env.PORT, () => {
    console.log('Started api on port ' + process.env.PORT);
  });
}, (err) => {
  throw err;
});
