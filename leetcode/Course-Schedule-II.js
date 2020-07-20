/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
//https://leetcode.com/problems/course-schedule-ii/discuss/724584/JavaScript-Clean-DFS-Topological-Sort-Beats-70

var findOrder = function(numCourses, prerequisites) {
    const adjList = new Map();
    let pending = new Set();
    const visited = new Set();
    const result = [];
    
    // create the adjacency list
    for(let [course, pre] of prerequisites) {
        adjList.set(pre, (adjList.get(pre) || new Set()).add(course));
    }
    for(let c = 0; c < numCourses; c++) {
        if(dfs(c)) return [];
    }
    
     function dfs(node) {
        // if cyclic return 'true';
        if(pending.has(node)) return true;
        if(visited.has(node)) return;
        pending.add(node);
        
        // loop over the adjacent nodes
        for(let next of (adjList.get(node) || [])) {
            if(dfs(next)) return true;
        }
        
        pending.delete(node);
        visited.add(node);
        result.push(node);
    }
    
    return result.reverse();
};