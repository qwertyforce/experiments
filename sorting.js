function swap(arr,a,b){
let temp=arr[a];
arr[a]=arr[b];
arr[b]=temp;	
}

function bubble_sort(arr){
	var swp;
	for (var i = 0; i < arr.length; i++) {
		swp=0;
		for (var j = 0; j <arr.length-i; j++) {
			if(arr[j]>arr[j+1]){
				swap(arr,j,j+1);
                swp=1;
			}
		}
		if(swp===0){
			break;
		}
	}
	return arr;
}
function insertion_sort(arr){
	var j;
	for (var i = 1; i < arr.length; i++) {
		j=i;
        while(j>0 && arr[j]<arr[j-1]){
         swap(arr,j,j-1);
         j-=1;
        }
	}
	return arr
}

function selection_sort(arr){
	var min;
	for (var i = 0; i < arr.length-2; i++) {
         min=i;
		for (var j = i+1; j < arr.length-1; j++) {
			if(arr[j]<arr[min]){
				min=j;
			}
		}
		if(min!==i){
				swap(arr,i,min)
			}
	}
	return arr;
}

function merge_sort(arr) {
  let length = arr.length;        
  if (length < 2) {
    return arr
  }
 let middle = Math.floor(length/2)
 let left = arr.slice(0, middle)     
 let right = arr.slice(middle)     
 return merge(merge_sort(left), merge_sort(right))
}

function merge(left, right) {
  let result = [];
  let i=0;
  let j=0;
  while(i < left.length && j < right.length) {
    if(left[i] < right[j]) {
      result.push(left[i]) ;
      i++;       
    } else {                       
      result.push(right[j]);
      j++;
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j))
}

function quick_sort2(arr) {
	if (arr.length < 2) {
		return arr;
	} else {
		const pivotPosition = Math.floor(Math.random() * arr.length);
		const pivot = arr[pivotPosition];
		 let less = [];
		 let greater = [];
		 for (let i = 0; i < arr.length; i++) {
			let isPivot = (i === pivotPosition);
			if(arr[i] <= pivot && !isPivot) {
				less.push(arr[i])
			} else if (arr[i] > pivot) {
				greater.push(arr[i]);
			}
		}
		 		
		return [...quick_sort2(less), pivot, ...quick_sort2(greater)];
	}
};

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


function buildHeap(arr) {
    for (var i = Math.floor(arr.length / 2); i >= 0; i -= 1) {
        heapify(arr, i,arr.length-1);
    }
}

function heapify(arr, i,heap_length) {
    var left = 2 * i + 1;
    var right = 2 * i + 2;
    var largest = i;
    if (left < heap_length && arr[left] > arr[largest]) {
        largest = left;
    }
    if (right < heap_length && arr[right] > arr[largest]) {
        largest = right;
    }
    if (largest != i) {
        swap(arr, i, largest);
        heapify(arr, largest,heap_length);
    }
}

function heap_sort(arr) {
    buildHeap(arr);
    var heap_length=arr.length;
    for (var i = arr.length - 1; i > 0; i--) {
        swap(arr, 0, i);
        heap_length--;
        heapify(arr, 0,heap_length);
    }
}


var BigArray =Array.from({ length: 20000000 }, ()=>Math.floor(Math.random() * 50000000)); 
    // var t0 = performance.now();
    // bubble_sort(BigArray.slice(0))
    // var t1 = performance.now();
    // console.log(`bubble sort took ${(t1 - t0) / 1000} seconds`)
    
    // var t0 = performance.now();
    // insertion_sort(BigArray.slice(0))
    // var t1 = performance.now();
    // console.log(`insertion_sort took ${(t1 - t0) / 1000} seconds`)
   

    // var t0 = performance.now();
    // selection_sort(BigArray.slice(0))
    // var t1 = performance.now();
    // console.log(`selection_sort took ${(t1 - t0) / 1000} seconds`)
    
    var t0 = performance.now();
    merge_sort(BigArray.slice(0))
    var t1 = performance.now();
    console.log(`merge_sort took ${(t1 - t0) / 1000} seconds`)
    

    var t0 = performance.now();
    quick_sort(BigArray.slice(0),0, BigArray.slice(0).length-1)
    var t1 = performance.now();
    console.log(`quick_sort took ${(t1 - t0) / 1000} seconds`)


    var t0 = performance.now();
    quick_sort2(BigArray.slice(0))
    var t1 = performance.now();
    console.log(`quick_sort2 took ${(t1 - t0) / 1000} seconds`)

    var t0 = performance.now();
    heap_sort(BigArray.slice(0))
    var t1 = performance.now();
    console.log(`heap_sort took ${(t1 - t0) / 1000} seconds`)



    