'use strict';

const itemReq = (mongoClient) => {
  const itemsCollection = mongoClient.collection('items');
  function getFn(req, res) {
    res.json({'status': 'ok'});
  };

  return {
    get: getFn
  };
};

module.exports = itemReq;
