class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(data) {
        if (this.root === null) {
            this.root = new Node(data);
        } else {
            this.insertNode(this.root, data);
        }
    }

    insertNode(node, data) {
        if (node.data > data) {
            if (node.left === null) {
                node.left = new Node(data);
            } else {
                this.insertNode(node.left, data);
            }
        } else {
            if (node.right === null) {
                node.right = new Node(data);
            } else {
                this.insertNode(node.right, data);
            }
        }
    }


    remove(data) {
        this.root = this.removeNode(this.root, data);
    }
    removeNode(node, data) {
        if (node === null) {
            return null;
        } else if (node.data>data) {
            node.left = this.removeNode(node.left, data);
            return node;
        } else if (node.data < data) {
            node.right = this.removeNode(node.right, data);
            return node;
        } else {
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }
            if (node.left === null) {
                node = node.right;
                return node;
            } else if (node.right === null) {
                node = node.left;
                return node;
            }
            var aux = this.findMinNode(node.right);
            node.data = aux.data;
            node.right = this.removeNode(node.right, aux.data);
            return node;
        }

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

    inorder(node) {
        if (node !== null) {
            this.inorder(node.left);
            console.log(node.data);
            this.inorder(node.right);
        }
    }

    preorder(node) {
        if (node != null) {
            console.log(node.data);
            this.preorder(node.left);
            this.preorder(node.right);
        }
    }
    postorder(node) {
        if (node != null) {
            this.postorder(node.left);
            this.postorder(node.right);
            console.log(node.data);
        }
    }
    search(node, data) {
        if (node === null) {
            return null;
        } else if (node.data > data) {
            return this.search(node.left, data);
        }
        else if (node.data < data ) {
            return this.search(node.right, data);
        }
        else {
            return node;
        }
    }

}