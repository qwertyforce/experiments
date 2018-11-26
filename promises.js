var p1 = Promise.resolve(3);
var p2 = 1337;
var p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
}); 
Promise.all([p1, p2, p3]).then(values => { 
  console.log(values); //[3,1337,"foo"]
});
//////////////////////////////////////////////
var p1 = new Promise((resolve, reject) => { 
  setTimeout(resolve, 100, "100"); 
}); 
var p2 = new Promise((resolve, reject) => { 
  setTimeout(resolve, 200, "200"); 
});
var p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 300, "300");
});

 Promise.race([p1, p2, p3]).then(function(value) {
  console.log(value); //100
}).finally(function() { console.log("always") });
//////////////////////////////////////////////
var p1 = new Promise(function(resolve, reject) {
  throw 'Error';
});
p1.catch(function(e) {
  console.log(e); // 'Error'
});
//////////////////////////////////////////////
var p2 = new Promise(function(resolve, reject) {
  resolve();
  throw 'Silenced Exception!';
});
p2.catch(function(e) {
   console.log(e); // never called
}).finally(function() { console.log("executed") });