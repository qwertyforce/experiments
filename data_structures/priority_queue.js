class Queue { 
    constructor() 
    { 
        this.elements = []; 
    } 
    enqueue(element,priority){
      var obj={
        data:element,
        priority:priority
      } 
      var enqueued = false; 
    for (var i = 0; i < this.elements.length; i++) { 
        if (this.elements[i].priority >=obj.priority) { 
            this.elements.splice(i, 0,obj); 
            enqueued = true; 
            break; 
        } 
    } 

    if (!enqueued) { 
        this.elements.push(obj); 
    } 

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
      	str+=` ${JSON.stringify(this.elements[i])}, `
      }
      str+="->Dequeue--->"
      console.log(str)
    }
} 