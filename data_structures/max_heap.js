class Heap{

    constructor(){
        this.elements=[]
    }

 swap(a,b){
let temp=this.elements[a];
this.elements[a]=this.elements[b];
this.elements[b]=temp;    
}

 heapify_up(i){
        var parent=this.get_parent(i)
        if (i<this.elements.length && this.elements[parent] <this.elements[i]){
            this.swap(i, parent);
           this.heapify_up(parent);
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
  var i=this.elements.length-1;
  this.heapify_up(i)
  }
  extract_max(){
    this.swap(0,this.elements.length-1)
    var max=this.elements.pop()
    this.heapify_down(0);
    return max;
  }
  get_max(){
    return this.elements[0]
  }
  heapify_down(i){
        var left =  this.get_left(i);
        var right =  this.get_right(i);
        var largest = i;
        if (left < this.elements.length && this.elements[left] > this.elements[i]){
            largest = left;
        }
        if (right < this.elements.length && this.elements[right] > this.elements[largest]){
            largest = right;
        }
        if (largest != i) {
            this.swap(i, largest);
            this.heapify_down(largest);
        }
    }
        
}