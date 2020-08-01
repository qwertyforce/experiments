function bellman_ford(graph,vertices) {
    const distance = new Array(vertices).fill(Infinity)
    distance[0] = 0
    for (let i = 0; i < vertices - 1; i++) {
        for (let edges of Object.values(graph)) {
            for (let edge of edges) {
                if (distance[edge.from] + edge.cost < distance[edge.to]) {
                    distance[edge.to] = distance[edge.from] + edge.cost;
                }
            }
        }
    }
    for (let i = 0; i < vertices - 1; i++) {
        for (let edges of Object.values(graph)) {
            for (let edge of edges) {
                if (distance[edge.from] + edge.cost < distance[edge.to]) {
                    distance[edge.to] = -Infinity
                }
            }
        }
    }
    return distance
}
const graph = {}
const start = 0
function add_edge(from, to, cost) {
    if (!graph[from]) {
        graph[from] = []
    }
    graph[from].push({ from, to, cost })
}
add_edge(0, 1, 1);
add_edge(1, 2, 1);
add_edge(2, 4, 1);
add_edge(4, 3, -3);
add_edge(3, 2, 1);
add_edge(1, 5, 4);
add_edge(1, 6, 4);
add_edge(5, 6, 5);
add_edge(6, 7, 4);
add_edge(5, 7, 3);
const distance = bellman_ford(graph,8)
for (let i = 0; i < 8; i++) {
    console.log(`The cost to get from node ${start} to ${i} is ${distance[i]}`)
}
