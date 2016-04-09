'use strict';
const ObjectID = require('mongodb').ObjectID

const itemReq = (mongoClient) => {
  const itemsCollection = mongoClient.collection('items');

  function getFn(req, res) {
    itemsCollection.findAsync({userId: ObjectID(req.userId)}).then((result) => {
      res.json(result);
    }, (err) => {
      res.status(500).json({error_message: 'problem inserting user'});
    });
  };
  function postFn(req, res) {
    let item = {
      userId: ObjectID(req.userId),
      type: req.body.type,
      title: req.body.title,
      datetime: new Date(req.body.datetime * 1000),
      editable: false,
      done: false
    };
    itemsCollection.insertOneAsync(item).then((result) => {
      res.json(item);
    }, (err) => {
      res.status(500).json({error_message: 'problem inserting item'});
    });
  };
  return {
    get: getFn,
    post: postFn
  };
};

module.exports = itemReq;
