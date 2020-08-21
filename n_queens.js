/**
 * @param {number} n
 * @return {string[][]}
 */
function solveNQueens (n) {
    const ans = []
    const columns=[]
    
    function valid_move(row,col){
        if(columns.includes(col)){ //same column
            return false
        }
        for (let i=0;i<columns.length;i++){// i === row
            const _row=i
            const column=columns[i]
            if(Math.abs(row-_row)===Math.abs(col-column)){ //diagonal
                return false
            }
        }
        return true
    }

    function backtrack(row) {
    if (row === n) {
        ans.push(columns.map(column => '.'.repeat(column) + 'Q' + '.'.repeat(n - column - 1)));
        return;
    }
    for (let col = 0; col < n; col++) {
        if (valid_move(row,col)) {
            columns.push(col);
            backtrack(row+1);
            columns.pop();
        }
    }
}
    
    backtrack(0);
    return ans;
};