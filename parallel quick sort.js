
console.log( navigator.hardwareConcurrency+" threads");

var blob = new Blob([
    `onmessage = function(e) { 

       function merge(left, right) {
  let result = new Uint32Array(left.length+right.length);
  let i=0;
  let j=0;
  while(i < left.length && j < right.length) {
    if(left[i] < right[j]) {
      result[i+j]=left[i] ;
      i++;       
    } else {                       
       result[i+j]=right[j];
      j++;
    }
  }
  if(i===left.length && j<right.length){
    for(var g=j;g<right.length;g++){
     result[i+g]=right[g]
    }
  }
  if(i<left.length && j===right.length){
    for(var g=i;g<left.length;g++){
     result[j+g]=left[g]
    }
  }
  return result.buffer
}

      function swap(arr,a,b){
let temp=arr[a];
arr[a]=arr[b];
arr[b]=temp;  
}

const quick_sort = (arr, start, end) => {
  if(start < end) {
    let pivot = partition(arr, start, end)
    quick_sort(arr, start, pivot - 1)
    quick_sort(arr, pivot + 1, end)
  } 
}

const partition = (arr, start, end) => { 
 var pivotPosition =Math.floor(start + Math.random() * (end - start + 1));
   swap(arr,pivotPosition,end) 
  let i = start - 1
  let j = start
   for(j=start;j < end;j++){
      if (arr[j] <=arr[end]) {
      i++
      swap(arr, j, i)
    }
   }
  swap(arr, i + 1, end)
  return i + 1
}
   if(e.data.job==='sort'){
    var arr = new Uint32Array(e.data.arr)
    quick_sort(arr,0,arr.length-1)
    postMessage(arr.buffer,[arr.buffer]);
}else{
      var half_1=new Uint32Array(e.data.arr1)
      var half_2=new Uint32Array(e.data.arr2)
     postMessage(merge(half_1,half_2))
}
    	 }`]);



var blobURL = window.URL.createObjectURL(blob);

var v1 = new Worker(blobURL);
var v2 = new Worker(blobURL);
var v3 = new Worker(blobURL);
var v4 = new Worker(blobURL);
var workers=[v1,v2,v3,v4];
var arr=Uint32Array.from({ length: 100000000 }, ()=>Math.floor(Math.random() * 50000000));
//var arr=Uint32Array.from([7,6,5,4,3,2,1,0]);
var half1=[];
var half2=[];
var half_1=[];
var half_2=[];
var half_3=[];
var half_4=[];
let middle = Math.floor(arr.length/2);
half1= arr.slice(0, middle);     
half2 = arr.slice(middle);  

let middlehalf1= Math.floor(half1.length/2);
half_1= half1.slice(0, middlehalf1);     
half_2 = half1.slice(middlehalf1);   

let middlehalf2= Math.floor(half2.length/2);
half_3= half2.slice(0, middlehalf2);     
half_4 = half2.slice(middlehalf2);   
var t0 = performance.now();


function get_promise(worker){
    return  new Promise((resolve, reject) => {
        worker.addEventListener("message", event => resolve(event.data),{once: true});
        worker.addEventListener("error", reject);
    });
}
    

v1.postMessage({job:"sort",arr:half_1.buffer},[half_1.buffer]);
v2.postMessage({job:"sort",arr:half_2.buffer},[half_2.buffer]);
v3.postMessage({job:"sort",arr:half_3.buffer},[half_3.buffer]);
v4.postMessage({job:"sort",arr:half_4.buffer},[half_4.buffer]);
Promise.all(workers.map(get_promise)).then(function(results){
    v1.postMessage({job:"merge",arr1:results[0],arr2:results[1]},[results[0],results[1]]);
    v2.postMessage({job:"merge",arr1:results[2],arr2:results[3]},[results[2],results[3]]);
    Promise.all([v1,v2].map(get_promise)).then(function(arrs){
        v1.postMessage({job:"merge",arr1:arrs[0],arr2:arrs[1]},[arrs[0],arrs[1]]);
        get_promise(v1).then(function(array){
            var x=new Uint32Array(array);
            console.log(x);
            var t1 = performance.now();
            console.log(`merge_sort took ${(t1 - t0) / 1000} seconds`);
        });     
    });
 
   
} );
