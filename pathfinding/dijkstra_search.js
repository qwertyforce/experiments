class PriorityQueue {
  constructor() {
    this.elements = [];
  }
  enqueue(element, priority) {
    var obj = {
      data: element,
      priority: priority
    }
    var enqueued = false;
    for (var i = 0; i < this.elements.length; i++) {
      if (this.elements[i].priority >= obj.priority) {
        this.elements.splice(i, 0, obj);
        enqueued = true;
        break;
      }
    }

    if (!enqueued) {
      this.elements.push(obj);
    }

  }
  dequeue() {
    if (this.elements === 0) {
      return 'Queue is already empty'
    }
    return this.elements.pop()
  }
  peek() {
    return this.elements[this.elements.length - 1]
  }
  isEmpty() {
    return (this.elements.length === 0)
  }
  printQueue() {
    var str = "Enqueue--->";
    for (var i = 0; i < this.elements.length; i++) {
      str += ` ${JSON.stringify(this.elements[i])}, `
    }
    str += "->Dequeue--->"
    console.log(str)
  }
}

class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.walls = []
    this.weights = {}
  }
  in_bounds(x, y) {
    return (0 <= x && x < this.width) && (0 <= y && y < this.height)
  }
  passable(x, y) {
    return !(this.walls.some((el) => el.x === x && el.y === y))
  }
  neighbors(x, y) {
    var result = [{ x: x + 1, y: y }, { x: x, y: y - 1 }, { x: x - 1, y: y }, { x: x, y: y + 1 }];
    result = result.filter((point) => this.in_bounds(point.x, point.y) && this.passable(point.x, point.y))
    return result
  }
  cost(from_point, to_point,) {
    return this.weights[JSON.stringify(from_point.x) + JSON.stringify(from_point.y)][JSON.stringify(to_point.x) + JSON.stringify(to_point.y)]
  }
}

function dijkstra_search(grid, start, end) {
  var points_to_visit = new PriorityQueue();
  points_to_visit.enqueue(start, 0)
  var came_from = {};
  var cost_so_far = {}
  var new_cost;
  came_from[JSON.stringify(start)] = null;
  cost_so_far[JSON.stringify(start)] = 0;
  var priority;
  while (!(points_to_visit.isEmpty())) {
    let current_point = points_to_visit.dequeue().data;
    //console.log(current_point)
    if (current_point.x === end.x && current_point.y === end.y) {
      break;
    }
    for (next of grid.neighbors(current_point.x, current_point.y)) {
      new_cost = cost_so_far[JSON.stringify(current_point)] + grid.cost(current_point, next)
      if (came_from[JSON.stringify(next)] === undefined || new_cost < cost_so_far[JSON.stringify(next)]) {
        cost_so_far[JSON.stringify(next)] = new_cost;
        priority = new_cost
        points_to_visit.enqueue(next, -priority)
        came_from[JSON.stringify(next)] = current_point
      }
    }
  }
  console.log(cost_so_far)
  return came_from

}

function backtrace(came_from, start, end) {
  var path = [end];
  while (path[path.length - 1] !== null) {
    path.push(came_from[JSON.stringify(path[path.length - 1])])
  }
  return path.reverse()
}

var field = new Grid(3, 3);        //  3x3 actually(including 0)  
field.weights["00"] = {
  "01": 1,
  "11": 4,
  "10": 1
}
field.weights["10"] = {
  "20": 1,
  "11": 4,
}
field.weights["20"] = {
  "10": 1,
  "21": 1,
}
field.weights["01"] = {
  "11": 4,
  "02": 2,
}
field.weights["02"] = {
  "01": 1,
  "12": 1,
}
field.weights["11"] = {
  "10": 1,
  "21": 1,
  "12": 1,
  "01": 1
}
field.weights["12"] = {
  "11": 4,
  "02": 2,
  "22": 1,
}
field.weights["21"] = {
  "20": 1,
  "11": 4,
  "22": 1,
}

var start = { x: 0, y: 0 }
var end = { x: 2, y: 2 }
var x = dijkstra_search(field, start, end)
console.log(backtrace(x, start, end))

