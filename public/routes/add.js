var express = require('express');
const app = express();
var router = express.Router();
const assert = require('assert');

//Here we are configuring express to use body-parser as middle-ware
app.use(express.json());
app.use(express.urlencoded());

//MongoConnect
//-------------->>>>Hier muss die passende Datenbank und die passende Collection angegeben werden!!!!!<<<<--------------
const url = 'mongodb://localhost:27017' // connection URL
const dbName = 'tourguidedb' // database name
const collectionName = 'locations' // collection name
//----------------------------------------------------------------------------------------------------------------------
const MongoClient = require('mongodb').MongoClient
const client = new MongoClient(url) // mongodb client

//Post Router
router.post('/newLocation', function(req, res, next) 
{
  //Check Request
  if(req.body.name == '' || req.body.url == '' || req.body.description == '' || req.body.geometry == '') {
    res.sendFile(__dirname + "/error_empty_input.html")
    return;
  }

  //Crete Payload to Store
  var GeoJson = '{' + '"type": "FeatureCollection"' + ',' + '"features":' + '[' + '{' + '"type": "Feature"' + ',' +
        '"properties":' +  '{' + '"Name":' + '"' + req.body.name + '"' + ',' 
                               + '"URL":' + '"' + req.body.url + '"' + ',' +
                               + '"Description":' + '"' + req.body.description + '"' + '}' + ',' 
                               + '"geometry":' + req.body.geometry + '}' + ']' + '}';
  console.log(GeoJson);

  //connect to the mongodb database and insert one new element
  client.connect(function(err) 
  {
    const db = client.db(dbName) //database
    const collection = db.collection(collectionName) //collection
    collection.find({name: req.body.name}).toArray(function(err, docs)
    {
        //assert.strictEqual(err, null)
        //check if name already exists
        if(docs.length >= 1){
          res.sendFile(__dirname + "/error_redundant_number.html")
        } 
        else {
          //Insert the document in the database
          collection.insertOne(JSON.parse(GeoJson), function(err, result) 
          {
            //assert.strictEqual(err, null)
            //assert.strictEqual(1, result.result.ok)
            res.sendFile(__dirname + "/done.html")
           })
        }
    })
  })
});
module.exports = router; //export as router