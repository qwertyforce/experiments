/**
 * @param {number[][]} grid
 * @return {number}
 */
function in_bounds(x, y, N) {
    return 0 <= x && 0 <= y && x < N && y < N
}

var shortestPathBinaryMatrix = function (grid) {
    const N = grid.length
    if (grid[0][0] === 1) {
        return -1
    }
    let step = 1
    const queue = [[0, 0]]
    const dirs = [[-1, 0], [1, 0], [0, 1], [0, -1], [-1, 1], [-1, -1], [1, 1], [1, -1]]

    while (queue.length) {
        const queue_len = queue.length
        for (let i = 0; i < queue_len; i++) {
            const [x, y] = queue.shift()
            if (x === N - 1 && y === N - 1) {
                return step
            }

            for (const [dx, dy] of dirs) {
                const newX = x + dx
                const newY = y + dy
                if (in_bounds(newX, newY, N) && grid[newX][newY] === 0) {
                    grid[newX][newY] = 1
                    queue.push([newX, newY])
                }
            }
        }
        step++
    }
    return -1
};
