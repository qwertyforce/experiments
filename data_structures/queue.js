class Queue { 
    constructor() 
    { 
        this.elements = []; 
    } 
    enqueue(element){
    	this.elements.unshift(element)
    }
    dequeue(){
    	if(this.elements===0){
    		return 'Queue is already empty'
    	}
        return this.elements.pop()
    }
    peek(){
    	return this.elements[this.elements.length-1]
    }
    isEmpty(){
    	return (this.elements.length===0)
    }
     printQueue(){
      var str="Enqueue--->";
      for (var i = 0; i<this.elements.length; i++) {
      	str+=` ${this.elements[i]}`
      }
      str+="->Dequeue--->"
      console.log(str)
    }
} 