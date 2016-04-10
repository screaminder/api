'use strict';
const ObjectID = require('mongodb').ObjectID
const userAuth = (mongoClient, twilio_client, config) => {
  const usersCollection = mongoClient.collection('users');

  function postFn(req, res) {
    usersCollection.findOneAsync({phone: req.body.phone}).then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        let user = {phone: req.body.phone, key: new ObjectID()}
        usersCollection.insertOneAsync(user).then((result) => {
          res.status(200).json(user);
        }, (err) => {
          res.status(400).json({error_message: 'problem inserting user'});
        });
      }
    }, (err) => {
      res.status(400).json({error_message: 'error on creating user'});
    });
  };

  function sendVerify(number, code){
    twilio_client.sendMessage({
      to: number,
      from: config.from,
      body: "Your verification code is: ", code, "."
    });
  };

  return {
    post: postFn
  };
};

module.exports = userAuth;
