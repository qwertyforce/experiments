function create_array(rows, columns) {
    const arr = new Array(rows).fill().map(() => new Array(columns).fill(0))
    return arr
};