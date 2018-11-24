class Stack { 
    constructor() 
    { 
        this.elements = []; 
    } 
    push(element){
    	this.elements.push(element)
    }
    pop(){
    	if(this.elements===0){
    		return 'Stack is already empty'
    	}
        return this.elements.pop()
    }
    peek(){
    	return this.elements[this.elements.length-1]
    }
    isEmpty(){
    	return (this.elements.length===0)
    }
     printStack(){
      console.log("----------------")
      for (var i = this.elements.length-1; i >=0 ; i--) {
      	console.log(this.elements[i])
      }
      console.log("----------------")
    }
} 