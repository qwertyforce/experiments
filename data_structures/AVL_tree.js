//https://github.com/gwtw/js-avl-tree
class Node {
    constructor(key, value) {
        this.left = null;
        this.right = null;
        this.height = null;
        this.key = key;
        this.value = value;
    }
    rotate_right() {
        const other = this.left;
        this.left = other.right;
        other.right = this;
        this.height = Math.max(this.left_height(), this.rightHeight()) + 1;
        other.height = Math.max(other.left_height(), this.height) + 1;
        return other;
    }
    rotate_left() {
        const other = this.right;
        this.right = other.left;
        other.left = this;
        this.height = Math.max(this.left_height(), this.right_height()) + 1;
        other.height = Math.max(other.right_height(), this.height) + 1;
        return other;
    }

    left_height() {
        if (!this.left) {
            return -1;
        }
        return this.left.height;
    }
    right_height() {
        if (!this.right) {
            return -1;
        }
        return this.right.height;
    }
}

class AVLTree {
    constructor() {
        this._root = null;
        this._size = 0;
    }
    _compare(a, b) {
        if (a > b) {
            return 1;
        }
        if (a < b) {
            return -1;
        }
        return 0;
    };
    insert(key, value) {
        this._root = this._insert(key, value, this._root);
        this._size++;
    };

    _insert(key, value, root) {
        // Perform regular BST insertion
        if (root === null) {
            return new Node(key, value);
        }

        if (this._compare(key, root.key) < 0) {
            root.left = this._insert(key, value, root.left);
        } else if (this._compare(key, root.key) > 0) {
            root.right = this._insert(key, value, root.right);
        } else {
            // It's a duplicate so insertion failed, decrement size to make up for it
            this._size--;
            return root;
        }

        // Update height and rebalance tree
        root.height = Math.max(root.left_height(), root.right_height()) + 1;
        var balanceState = getBalanceState(root);

        if (balanceState === BalanceState.UNBALANCED_LEFT) {
            if (this._compare(key, root.left.key) < 0) {
                // Left left case
                root = root.rotate_right();
            } else {
                // Left right case
                root.left = root.left.rotate_left();
                return root.rotate_right();
            }
        }

        if (balanceState === BalanceState.UNBALANCED_RIGHT) {
            if (this._compare(key, root.right.key) > 0) {
                // Right right case
                root = root.rotate_left();
            } else {
                // Right left case
                root.right = root.right.rotate_right();
                return root.rotate_left();
            }
        }
        return root;
    };
    delete(key) {
        this._root = this._delete(key, this._root);
        this._size--;
    };
    _delete(key, root) {
        // Perform regular BST deletion
        if (root === null) {
            this._size++;
            return root;
        }

        if (this._compare(key, root.key) < 0) {
            // The key to be deleted is in the left sub-tree
            root.left = this._delete(key, root.left);
        } else if (this._compare(key, root.key) > 0) {
            // The key to be deleted is in the right sub-tree
            root.right = this._delete(key, root.right);
        } else {
            // root is the node to be deleted
            if (!root.left && !root.right) {
                root = null;
            } else if (!root.left && root.right) {
                root = root.right;
            } else if (root.left && !root.right) {
                root = root.left;
            } else {
                // Node has 2 children, get the in-order successor
                var inOrderSuccessor = minValueNode(root.right);
                root.key = inOrderSuccessor.key;
                root.value = inOrderSuccessor.value;
                root.right = this._delete(inOrderSuccessor.key, root.right);
            }
        }

        if (root === null) {
            return root;
        }

        // Update height and rebalance tree
        root.height = Math.max(root.left_height(), root.right_height()) + 1;
        var balanceState = getBalanceState(root);

        if (balanceState === BalanceState.UNBALANCED_LEFT) {
            // Left left case
            if (getBalanceState(root.left) === BalanceState.BALANCED ||
                getBalanceState(root.left) === BalanceState.SLIGHTLY_UNBALANCED_LEFT) {
                return root.rotate_right();
            }
            // Left right case
            if (getBalanceState(root.left) === BalanceState.SLIGHTLY_UNBALANCED_RIGHT) {
                root.left = root.left.rotate_left();
                return root.rotate_right();
            }
        }

        if (balanceState === BalanceState.UNBALANCED_RIGHT) {
            // Right right case
            if (getBalanceState(root.right) === BalanceState.BALANCED ||
                getBalanceState(root.right) === BalanceState.SLIGHTLY_UNBALANCED_RIGHT) {
                return root.rotate_left();
            }
            // Right left case
            if (getBalanceState(root.right) === BalanceState.SLIGHTLY_UNBALANCED_LEFT) {
                root.right = root.right.rotate_right();
                return root.rotate_left();
            }
        }

        return root;
    };


    _delete(key, root) {
        // Perform regular BST deletion
        if (root === null) {
            this._size++;
            return root;
        }

        if (this._compare(key, root.key) < 0) {
            // The key to be deleted is in the left sub-tree
            root.left = this._delete(key, root.left);
        } else if (this._compare(key, root.key) > 0) {
            // The key to be deleted is in the right sub-tree
            root.right = this._delete(key, root.right);
        } else {
            // root is the node to be deleted
            if (!root.left && !root.right) {
                root = null;
            } else if (!root.left && root.right) {
                root = root.right;
            } else if (root.left && !root.right) {
                root = root.left;
            } else {
                // Node has 2 children, get the in-order successor
                var inOrderSuccessor = minValueNode(root.right);
                root.key = inOrderSuccessor.key;
                root.value = inOrderSuccessor.value;
                root.right = this._delete(inOrderSuccessor.key, root.right);
            }
        }

        if (root === null) {
            return root;
        }

        // Update height and rebalance tree
        root.height = Math.max(root.left_height(), root.right_height()) + 1;
        var balanceState = getBalanceState(root);

        if (balanceState === BalanceState.UNBALANCED_LEFT) {
            // Left left case
            if (getBalanceState(root.left) === BalanceState.BALANCED ||
                getBalanceState(root.left) === BalanceState.SLIGHTLY_UNBALANCED_LEFT) {
                return root.rotate_right();
            }
            // Left right case
            if (getBalanceState(root.left) === BalanceState.SLIGHTLY_UNBALANCED_RIGHT) {
                root.left = root.left.rotate_left();
                return root.rotate_right();
            }
        }

        if (balanceState === BalanceState.UNBALANCED_RIGHT) {
            // Right right case
            if (getBalanceState(root.right) === BalanceState.BALANCED ||
                getBalanceState(root.right) === BalanceState.SLIGHTLY_UNBALANCED_RIGHT) {
                return root.rotate_left();
            }
            // Right left case
            if (getBalanceState(root.right) === BalanceState.SLIGHTLY_UNBALANCED_LEFT) {
                root.right = root.right.rotate_right();
                return root.rotate_left();
            }
        }

        return root;
    };

    get(key) {
        if (this._root === null) {
            return null;
        }

        return this._get(key, this._root).value;
    };

    _get(key, root) {
        var result = this._compare(key, root.key);

        if (result === 0) {
            return root;
        }

        if (result < 0) {
            if (!root.left) {
                return null;
            }
            return this._get(key, root.left);
        }

        if (!root.right) {
            return null;
        }
        return this._get(key, root.right);
    };

    contains(key) {
        if (this._root === null) {
            return false;
        }

        return !!this._get(key, this._root);
    };


    findMinimum() {
        return minValueNode(this._root).key;
    };
    findMaximum() {
        return maxValueNode(this._root).key;
    };
    size() {
        return this._size;
    };
    isEmpty() {
        return this._size === 0;
    };

}

var BalanceState = {
    UNBALANCED_RIGHT: 1,
    SLIGHTLY_UNBALANCED_RIGHT: 2,
    BALANCED: 3,
    SLIGHTLY_UNBALANCED_LEFT: 4,
    UNBALANCED_LEFT: 5
};


function getBalanceState(node) {
    var heightDifference = node.left_height() - node.right_height();
    switch (heightDifference) {
        case -2: return BalanceState.UNBALANCED_RIGHT;
        case -1: return BalanceState.SLIGHTLY_UNBALANCED_RIGHT;
        case 1: return BalanceState.SLIGHTLY_UNBALANCED_LEFT;
        case 2: return BalanceState.UNBALANCED_LEFT;
        default: return BalanceState.BALANCED;
    }
}

function minValueNode(root) {
    var current = root;
    while (current.left) {
        current = current.left;
    }
    return current;
}
function maxValueNode(root) {
    var current = root;
    while (current.right) {
        current = current.right;
    }
    return current;
}


