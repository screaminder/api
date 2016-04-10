'use strict';
const ObjectID = require('mongodb').ObjectID
const _ = require('lodash');
const userAuth = (mongoClient, twilio_client) => {
  const usersCollection = mongoClient.collection('users');

  function postFn(req, res) {
    usersCollection.findOneAsync({phone: req.body.phone}).then((result) => {
      if (result) {
        res.status(200).json(_.omit(result, ['code']));
      } else {
        let user = {
          phone: req.body.phone,
          key: new ObjectID(),
          verified: false,
          code: getCode()
        }
        usersCollection.insertOneAsync(user).then((result) => {
          sendVerify(user.phone, user.code);
          res.status(200).json(_.omit(user, ['code']));
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
      from: process.env.TWILIO_FROM,
      body: "Your verification code is: " + code + "."
    }, function(err, response) {
      if(err)
        console.error(err)
    });
  };

  function getCode(){
    return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  };

  return {
    post: postFn
  };
};

module.exports = userAuth;
