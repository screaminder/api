#Screaminder API


## Creating user

 POST screaminder-api.herokuapp.com/auth
 Content-Type: application/json

### Request body
 ```json
 {"phone":"xxx"}
 ```

### Response
 ```json
 {"phone":"xxx","key":"xxxx","_id":"xxx"}
 ```
 Use the value of "key" in Authorization header for item requests

## Getting list of user items

GET screaminder-api.herokuapp.com/items
Content-Type: application/json
Authorization: Bearer xxx

###Response
 ``json
 [{
   "userId": "xxx",
   "type": "birthday",
   "title": "name of the item",
   "datetime": "2016-04-09T11:40:41.000Z",
   "editable": false,
   "done": false,
   "_id": "5708eeb7f0bbc703000309d6"
 }]
 ```

## Posting item

POST screaminder-api.herokuapp.com/items
Content-Type: application/json
Authorization: Bearer xxx

### Request body
 ``json
 {  
   "type":"birthday/workout/whatever",
   "title": "name of the item",
   "datetime": "unixtimestamp",
  }
 ```

###Response
 ``json
 {
   "userId": "xxx",
   "type": "birthday",
   "title": "name of the item",
   "datetime": "2016-04-09T11:40:41.000Z",
   "editable": false,
   "done": false,
   "_id": "5708eeb7f0bbc703000309d6"
 }
 ```
