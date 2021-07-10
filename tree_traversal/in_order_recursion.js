const inorderTraversal = function (root) {
    const ans = []
    const traverse = (node) => {
        if (node) {
            traverse(node.left)
            ans.push(node.val)
            traverse(node.right)
        }
    }
    traverse(root)
    return ans
};