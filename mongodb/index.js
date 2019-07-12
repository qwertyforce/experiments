var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://';
var options={useNewUrlParser:true};
const dbName = 'testing';
const client = new MongoClient(url,options);

client.connect(function(err) {
	if(err){
	console.log(err)
   }else{
     console.log("Connected successfully to server");
     var documents=[{a : 1}, {a : 2}, {a : 3}];
  insertDocuments(client.db(dbName),(res)=>console.log(res),"test1",documents);
  findDocuments(client.db(dbName),(res)=>console.log(res),"test1",{});
  updateDocument(client.db(dbName),(res)=>console.log(res),"test1",{a:1},{b:2});
  removeDocument(client.db(dbName),(res)=>console.log(res),"test1",{a:3});

   }
});

 function insertDocuments(db, callback,collection_name,documents) {
  const collection = db.collection(collection_name);
  collection.insertMany(documents, function(err, result) {
    console.log("Inserted  documents into the collection");
    callback(result);
  });
}
 function findDocuments(db, callback,collection_name,selector) {
  const collection = db.collection(collection_name);
  collection.find(selector).toArray(function(err, docs) {
    console.log("Found the following records");
    callback(docs);
  });
}

 function updateDocument(db, callback,collection_name,selector,update) {
  const collection = db.collection(collection_name);
  collection.updateOne(selector, { $set: update }, function(err, result) {
    console.log("Updated the document");
    callback(result);
  });  
}

 function removeDocument(db, callback,collection_name,selector) {
  const collection = db.collection(collection_name);
   collection.deleteOne(selector, function(err, result) {
    console.log("Removed the document");
    callback(result);
  });    
}