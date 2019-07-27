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

class Grid{ 
 constructor(width,height){
  this.width=width;
  this.height=height;
  this.walls=[]
 }
 in_bounds(x,y){
 return (0<=x && x<this.width)&&(0<=y && y<this.height)
 }
 passable(x,y){
    return !( this.walls.some((el)=>el.x===x&&el.y===y) ) 
 }
 neighbors(x,y){
    var result=[{x:x+1,y:y}, {x:x, y:y-1}, {x:x-1, y:y}, {x:x, y:y+1}];
    result=result.filter((point)=>this.in_bounds(point.x,point.y)&&this.passable(point.x,point.y))
    return result
 }
}


function bfs(grid,start,end){
var points_to_visit = new Queue();
points_to_visit.enqueue(start)
var came_from={};
came_from[JSON.stringify(start)] = null;
 while(!(points_to_visit.isEmpty())){
    let current_point=points_to_visit.dequeue();
    if(current_point.x===end.x && current_point.y===end.y){
        break;
    }
    for (next of grid.neighbors(current_point.x,current_point.y)){
        if(came_from[JSON.stringify(next)]===undefined){
            points_to_visit.enqueue(next)
            came_from[JSON.stringify(next)] = current_point
        }
    }
 }
 return came_from
}
function backtrace(came_from,start,end){
var path=[end];
while(path[path.length-1]!==null){
    path.push(came_from[JSON.stringify(path[path.length-1])])
}
return path.reverse()
}


var field=new Grid(10,10);   
field.walls.push({x:4,y:3})
field.walls.push({x:4,y:4})
field.walls.push({x:4,y:5})
field.walls.push({x:4,y:6})
field.walls.push({x:4,y:7})
field.walls.push({x:5,y:4})
field.walls.push({x:5,y:8})
field.walls.push({x:6,y:4})
field.walls.push({x:7,y:4})
var start={x:3,y:5}
var end={x:5,y:5}
var x=bfs(field,start,end);
console.log(x)

console.log(backtrace(x,start,end))