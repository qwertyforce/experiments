function permute(word, start, end) {
    word=word.slice()
    if (start === end) {
        permutations.push(word)
        return
    }
    for (let i = start; i <= end; i++) {
        let temp=word[start]
        word[start]=word[i]
        word[i]=temp
        permute(word, start + 1, end)
        word[i]=word[start]
        word[start]=temp
    }
}

let x = Array.from("ABC")
const permutations=[]
permute(x, 0, x.length - 1)
