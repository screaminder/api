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

  return {
    get: getFn
  };
};

module.exports = itemReq;
