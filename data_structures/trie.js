class Node {
    constructor(value) {
        this.value = value
        this.children = {}
        this.is_complete_word = false
    }

}

class Trie {
    constructor() {
        this.root = new Node()
        this.words = []
    }

    insert(word) {
        let node = this.root
        for (const chr of word) {
            if (!node.children[chr]) {
                node.children[chr] = new Node(chr)
            }
            node = node.children[chr]
        }
        node.is_complete_word = true
    }


    find_prefix(prefix) {
        this.words = []
        let node = this.root
        for (const chr of prefix) {
            if (!node.children[chr]) {
                console.log("Not found")
                return false
            }
            node = node.children[chr]
        }
        this._find_prefix(node, prefix)
        return this.words
    }

    _find_prefix(node, curr_word) {
        if (node.is_complete_word) {
            this.words.push(curr_word)
        }
        for (let child in node.children) {
            this._find_prefix(node.children[child], curr_word + node.children[child].value)
        }
    }

}