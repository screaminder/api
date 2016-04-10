'use strict';

const Q = require('q');
const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
const statusReq = require('./actions/status.js');
const MongoDB = require('./db/mongoDB.js');
const bodyParser = require('body-parser');
const authMiddleware = require('./auth/authMiddleware.js');
const verifiedMiddleware = require('./auth/verifiedMiddleware.js');

const mongoClient = new MongoDB(process.env.MONGOLAB_URI);
const twilioClient = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

const userAuth = require('./actions/auth.js')(mongoClient, twilioClient, config);
const itemReq = require('./actions/items.js')(mongoClient);
const verifyReq = require('./actions/verify.js')(mongoClient);


function onError(err, req, res, next) {
    console.log(err);
    res.statusCode = 500;
    res.status(500).json({error_message: 'something went wrong'});
}

const app = express();

//actions
app.use(cors());

app.get('/status', statusReq.get);
app.post('/auth', bodyParser.json(), userAuth.post);
app.post('/verify', authMiddleware(mongoClient), bodyParser.json(), verifyReq.post);

app.get('/items', authMiddleware(mongoClient), verifiedMiddleware(), itemReq.get);
app.post('/items', authMiddleware(mongoClient), verifiedMiddleware(), bodyParser.json(), itemReq.post);
app.put('/items/:itemId', authMiddleware(mongoClient), verifiedMiddleware(), bodyParser.json(), itemReq.put);

// error handler
app.use(onError);

Q.all([mongoClient.connectAsync()]).then(() => {
  app.listen(process.env.PORT, () => {
    console.log('Started api on port ' + process.env.PORT);
  });
}, (err) => {
  throw err;
});
