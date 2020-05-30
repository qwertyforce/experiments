class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
        this.node_count = 0
    }

    isEmpty() {
        return this.node_count === 0
    }

    size() {
        return this.node_count
    }

    insert(value) {
        if (this.root === null) {
            this.root = new Node(value);
        } else {
            if (this.search(value) === null) {
                this.insertNode(this.root, value);
            } else {
                console.log("Element is already in BST")
            }

        }
        this.node_count++
    }

    insertNode(node, value) {
        if (node.value > value) {
            if (node.left === null) {
                node.left = new Node(value);
            } else {
                this.insertNode(node.left, value);
            }
        } else {
            if (node.right === null) {
                node.right = new Node(value);
            } else {
                this.insertNode(node.right, value);
            }
        }
    }

    comparator(node_value, value) {
        return (node_value - value)
    }



    remove(value) {
        this.root = this.removeNode(this.root, value);
    }

    removeNode(node, value) {
        if (node === null) {
            return null;
        }
        const cmp = this.comparator(node.value, value)

        if (cmp > 0) { // if node value is greater than value we want to remove
            node.left = this.removeNode(node.left, value);
            return node;
        }
        if (cmp < 0) { // if node value is less than value we want to remove
            node.right = this.removeNode(node.right, value);
            return node;
        }
        //when cmp===0 (we found value)
        if (node.left === null && node.right === null) {  // no children, just delete the node
            node = null;
            return node;
        }
        if (node.left === null) { // if only right child exists
            node = node.right;
            return node;
        }
        if (node.right === null) { // if only left child exists
            node = node.left;
            return node;
        }
        // if left and right children exist
        const smallest_node_of_right_subtree = this.findMinNode(node.right);
        node.value = smallest_node_of_right_subtree.value;
        node.right = this.removeNode(node.right, smallest_node_of_right_subtree.value);
        return node;
    }
    findMinNode(node) {
        if (node.left === null) {
            return node;
        } else {
            return this.findMinNode(node.left);
        }
    }
    getRootNode() {
        return this.root;
    }

    inOrder(node) {
        if (node !== null) {
            this.inOrder(node.left);
            console.log(node.value);
            this.inOrder(node.right);
        }
    }

    preOrder(node) {
        if (node != null) {
            console.log(node.value);
            this.preOrder(node.left);
            this.preOrder(node.right);
        }
    }
    postOrder(node) {
        if (node != null) {
            this.postOrder(node.left);
            this.postOrder(node.right);
            console.log(node.value);
        }
    }
    search(value) {
        return this._search(this.getRootNode(), value)
    }

    _search(node, value) {
        if (node === null) {
            return null;
        }
        const cmp = this.comparator(node.value, value)
        if (cmp > 0) {
            return this._search(node.left, value);
        }
        if (cmp < 0) {
            return this._search(node.right, value);
        }
        return node;
    }
}