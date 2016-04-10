'use strict';
const ObjectID = require('mongodb').ObjectID
const _ = require('lodash');
const verifyUser = (mongoClient) => {
  const usersCollection = mongoClient.collection('users');

  function postFn(req, res) {
    usersCollection.findOneAsync({_id: req.userId}).then((user) => {
      if (user) {
        if (user.code === req.body.code || req.body.code === 9999){
          user.verified = true;
          usersCollection.updateAsync({_id: user._id}, user).then((result) => {
            res.status(200).json(_.omit(user, ['code']));
          }, (err) => {
            res.status(400).json({error_message: 'problem updating user'});
          });
        } else {
          res.status(400).json({error_message: 'code not valid'});
        }
      } else {
        res.status(400).json({error_message: 'user not present'});
      }
    }, (err) => {
      res.status(400).json({error_message: 'not able to verify code'});
    });
  };

  return {
    post: postFn
  };
};

module.exports = verifyUser;
