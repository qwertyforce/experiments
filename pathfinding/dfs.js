class Grid {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.walls = []
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
}

var came_from = {};
function dfs(current_point){
    for (next of field.neighbors(current_point.x, current_point.y)) {
        if (came_from[JSON.stringify(next)] === undefined) {
            came_from[JSON.stringify(next)] = current_point
            dfs(next)
        }
    }
}
function backtrace(end) {
    var path = [end];
    while (path[path.length - 1] !== null) {
        path.push(came_from[JSON.stringify(path[path.length - 1])])
    }
    return path.reverse()
}


var field = new Grid(10, 10);
field.walls.push({ x: 4, y: 3 })
field.walls.push({ x: 4, y: 4 })
field.walls.push({ x: 4, y: 5 })
field.walls.push({ x: 4, y: 6 })
field.walls.push({ x: 4, y: 7 })
field.walls.push({ x: 5, y: 4 })
field.walls.push({ x: 5, y: 8 })
field.walls.push({ x: 6, y: 4 })
field.walls.push({ x: 7, y: 4 })
var start = { x: 3, y: 5 }
var end = { x: 5, y: 5 }
came_from[JSON.stringify(start)] = null;
dfs(start)


console.log(backtrace(end))
//DOES NOT FIND SHORTEST PATH