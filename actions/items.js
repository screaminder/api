'use strict';
const ObjectID = require('mongodb').ObjectID

const itemReq = (mongoClient) => {
  const itemsCollection = mongoClient.collection('items');

  function getFn(req, res) {
    itemsCollection.findAsync({$query: {$and: [{userId: ObjectID(req.userId)}, {done: false}]}, $orderby: {datetime: 1 }}).then((result) => {
      res.json(result);
    }, (err) => {
      console.log(err);
      res.status(400).json({error_message: 'problem finding item'});
    });
  };

  function postFn(req, res) {
    let item = {
      userId: ObjectID(req.userId),
      type: req.body.type,
      title: req.body.title,
      datetime: new Date(req.body.datetime),
      editable: false,
      done: false
    };
    itemsCollection.insertOneAsync(item).then((result) => {
      res.json(item);
    }, (err) => {
      res.status(400).json({error_message: 'problem inserting item'});
    });
  };

  function putFn(req, res) {
    itemsCollection.findOneAsync({_id: ObjectID(req.params.itemId)}).then((result) => {
      if (result) {
        if (req.body.done) {
          result.done = req.body.done;
        }
        if (req.body.title) {
          result.title = req.body.title;
        }
        itemsCollection.updateAsync({_id: ObjectID(result._id)}, result).then((newResult) => {
          res.json(result);
        }, (err) => {
          res.status(400).json({error_message: 'problem finding item'});
        });
      } else {
        res.status(404).json({error_message: 'item not found'});
      }
    }, (err) => {
      res.status(400).json({error_message: 'problem finding item'});
    });
  };

  return {
    get: getFn,
    post: postFn,
    put: putFn
  };
};

module.exports = itemReq;
