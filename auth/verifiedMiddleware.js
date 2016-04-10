'use strict';

const _ = require('lodash');

const verifiedMiddleware = _.curry((req, res, next) => {
  if(req.method === 'OPTIONS') {
    next();
    return;
  }

  if (req.userVerified === true) {
    next();
  } else {
    res.status(401).json({error_message: 'user not verified'});
  }
});

module.exports = verifiedMiddleware;
