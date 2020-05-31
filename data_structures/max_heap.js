class Heap{

    constructor(){
        this.elements=[]
    }

 swap(a,b){
let temp=this.elements[a];
this.elements[a]=this.elements[b];
this.elements[b]=temp;    
}
 build_heap(arr){
   this.elements=arr
  for (let index = Math.floor(arr.length/2); index >-1; index--) {
   this.heapify_down(index)
  }

 }

 heapify_up(index){
       while(index!==0 && this.elements[this.get_parent(index)]<this.elements[index]){
         this.swap(this.get_parent(index),index)
         index=this.get_parent(index)
       }
    }

  get_left(i) {
    return (2 * i) + 1;
  }
  get_right(i) {
    return (2 * i) + 2;
  }
  get_parent(i) {
    return Math.floor((i - 1) / 2);
  }

  insert(item){
  this.elements.push(item);
  this.heapify_up(this.elements.length-1)
  }

  extract_max(){
    this.swap(0,this.elements.length-1)
    const max=this.elements.pop()
    this.heapify_down(0);
    return max;
  }

  get_max(){
    return this.elements[0]
  }

  heapify_down(index){
        while(this.elements[this.get_left(index)]!==undefined){
         let biggerChildIndex=this.get_left(index)
         if(this.elements[this.get_right(index)] !==undefined && this.elements[this.get_right(index)] > this.elements[this.get_left(index)]){
          biggerChildIndex=this.get_right(index)
         }
         if(this.elements[index]> this.elements[biggerChildIndex]){
           break;
         }else{
           this.swap(index,biggerChildIndex)
         }
         index=biggerChildIndex
        }
    }
        
}