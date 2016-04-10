#Screaminder API


## Creating user

 POST screaminder-api.herokuapp.com/auth
 Content-Type: application/json

### Request body
Phone number is unique. If a number already exists you get error "problem inserting user".

 ```json
 {"phone":"xxx"}
 ```

### Response
 ```json
 {"phone":"xxx","key":"xxxx","_id":"xxx", "verified": false}
 ```
 Use the value of "key" in Authorization header for item requests

## Verifying user
```
POST screaminder-api.herokuapp.com/verify
Content-Type: application/json
Authorization: Bearer xxx
```

### Request body
Code is four digit number

 ```json
 {"code":1234}
 ```

### Response
  ```json
  {"phone":"xxx","key":"xxxx","_id":"xxx", "verified": true}
  ```

## Getting list of user items
```
GET screaminder-api.herokuapp.com/items
Content-Type: application/json
Authorization: Bearer xxx
```
###Response
 ```json
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
```
POST screaminder-api.herokuapp.com/items
Content-Type: application/json
Authorization: Bearer xxx
```
### Request body
 ```json
 {  
   "type":"birthday/workout/whatever",
   "title": "name of the item",
   "datetime": "isoStandardDate",
  }
 ```

###Response
 ```json
 {
   "userId": "xxx",
   "type": "birthday",
   "title": "name of the item",
   "datetime": "2016-04-09T11:40:41.000Z",
   "editable": false,
   "done": false,
   "_id": "xxxx"
 }
 ```


## Updating item
```
PUT screaminder-api.herokuapp.com/items/{itemId}
Content-Type: application/json
Authorization: Bearer xxx
```

### Request body
 ```json
 {  
   "done": true,
   "title": "new title",
}
 ```

###Response
  ```json
  {
    "userId": "xxx",
    "type": "birthday",
    "title": "new title",
    "datetime": "2016-04-09T11:40:41.000Z",
    "editable": false,
    "done": true,
    "_id": "xxx"
  }
  ```
