const postorderTraversal = function (root) {
    const ans = []
    const traverse = (node) => {
        if (node) {
            traverse(node.left)
            traverse(node.right)
            ans.push(node.val)
        }
    }
    traverse(root)
    return ans
};