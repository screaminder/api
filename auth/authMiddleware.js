'use strict';

const _ = require('lodash');
const ObjectID = require('mongodb').ObjectID

const authMiddleware = _.curry((mongoClient, req, res, next) => {
  const usersCollection = mongoClient.collection('users');
  //let's ignore OPTIONS requests
  if(req.method === 'OPTIONS') {
    next();
    return;
  }

  if(!req.headers.authorization) {
    res.status(401).json({error_message: 'authorization header must be present'});
    return;
  }
  // authorization: Bearer xyz
  let authSplit = req.headers.authorization.split(' ');
  if(authSplit.length !== 2) {
    res.status(401).json({error_message: 'authorization header must be valid'});
    return;
  }

  usersCollection.findOneAsync({key: ObjectID(authSplit[1])}).then((result) => {
    if (result) {
      req.userId = result._id;
      req.userVerified = result.verified;
      next();
      return;
    } else {
      res.status(401).json({error_message: 'not allowed'});
      return;
    }

  }, (err) => {
    res.status(401).json({error_message: 'not allowed'});
    return;
  });

});

module.exports = authMiddleware;
