var admin = require("firebase-admin");
var FieldValue = admin.firestore.FieldValue;
var serviceAccount = require("./************************.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://********.firebaseio.com"
});
const db = admin.firestore();

function create(name,data){
db.collection('users').doc(name).set(data);
}

function update(name,data){
db.collection('users').doc(name).update(data);
}

function delete_doc(name){
db.collection('users').doc(name).delete();    
}

function remove_field(doc_name,field_name){
update(doc_name,{[field_name]:FieldValue.delete()})
}

create("Bob",{name:"Bob",pass_hash:"e10adc3949ba59abbe56e057f20f883e",role:"user"});
update("Bob",{role:"Admin"});
remove_field("Bob","role");
delete_doc("Bob");