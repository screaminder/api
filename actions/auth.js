'use strict';
const ObjectID = require('mongodb').ObjectID
const userAuth = (mongoClient) => {
  const usersCollection = mongoClient.collection('users');

  function postFn(req, res) {
    usersCollection.findOneAsync({phone: req.body.phone}).then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        let user = {phone: req.body.phone, key: new ObjectID()}
        usersCollection.insertOneAsync(user).then((result) => {
          res.status(200).json(result);
        }, (err) => {
          res.status(400).json({error_message: 'problem inserting user'});
        });
      }
    }, (err) => {
      res.status(400).json({error_message: 'error on creating user'});
    });
  };

  return {
    post: postFn
  };
};

module.exports = userAuth;
