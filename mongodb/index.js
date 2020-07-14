var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/';
var options={ useNewUrlParser: true,
  useUnifiedTopology: true};
const db_main = 'testing';
const client = new MongoClient(url,options);

client.connect(function(err) {
	if(err){
	console.log(err)
   }else{
     console.log("Connected successfully to server");
     var documents=[{a : 1}, {a : 2}, {a : 3},{a:4,arr:[1,2,3,4]}];
  insertDocuments((res)=>console.log(res),"test1",documents);
  findDocuments((res)=>console.log(res),"test1",{});
  updateDocument((res)=>console.log(res),"test1",{a:1},{b:2});
  removeDocument((res)=>console.log(res),"test1",{a:3});
  addToArrayInDocument((res)=>console.log(res),"test1",{a:4},{arr:5});
  removeFromArrayInDocument((res)=>console.log(res),"test1",{a:4},{arr:3});
   }
});

 function insertDocuments(callback,collection_name,documents) {
  const collection = client.db(db_main).collection(collection_name);
  collection.insertMany(documents, function(err, result) {
    console.log("Inserted  documents into the collection");
    callback(result);
  });
}
 function findDocuments(callback,collection_name,selector) {
  const collection = client.db(db_main).collection(collection_name);
  collection.find(selector).toArray(function(err, docs) {
    console.log("Found the following records");
    callback(docs);
  });
}

 function updateDocument(callback,collection_name,selector,update) {
  const collection = client.db(db_main).collection(collection_name);
  collection.updateOne(selector, { $set: update }, function(err, result) {
    console.log("Updated the document");
    callback(result);
  });  
}

 function removeDocument(callback,collection_name,selector) {
  const collection = client.db(db_main).collection(collection_name);
   collection.deleteOne(selector, function(err, result) {
    console.log("Removed the document");
    // callback(result);
  });    
}
function addToArrayInDocument(callback,collection_name,selector,update) {
  const collection = client.db(db_main).collection(collection_name);
  let result =collection.updateOne(selector, { $push: update }, function(err, result) {
    console.log("added to the array");
    // callback(result);
  }); 
}

function removeFromArrayInDocument(callback,collection_name,selector,update) {
  const collection = client.db(db_main).collection(collection_name);
  let result = collection.updateOne(selector, { $pull: update }, function(err, result) {
    console.log("Removed from the array");
    // callback(result);
  }); 
}