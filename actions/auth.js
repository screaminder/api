'use strict';
const ObjectID = require('mongodb').ObjectID
const userAuth = (mongoClient) => {
  const usersCollection = mongoClient.collection('users');

  function postFn(req, res) {
    let user = {phone: req.body.phone, key: new ObjectID()}
    usersCollection.insertOneAsync(user).then((result) => {
      res.status(200).json(user);
    }, (err) => {
      console.log(err);
      res.status(400).json({error_message: 'problem inserting user'});
    });
  };

  return {
    post: postFn
  };
};

module.exports = userAuth;
