function  compute_prefix_function(word){
  var result=[0];
    var k = 0;  
  for (var i = 1; i < word.length; i++) { 
    result[i]=0;
    while ((k > 0) && (word[k] != word[i])){
    k = result[k - 1]; 
    } 
    if (word[k] === word[i]){
    result[i] = ++k;
    }
    
  }
  return result;
}

 function kmp(text, word) {
  if (word.length === 0) {
    return 0;
  } 
  let matches=[]
  let textIndex = 0;
  let wordIndex = 0;
  const patternTable = compute_prefix_function(word);

  while (textIndex < text.length) {
    if (text[textIndex] === word[wordIndex]) {
      if (wordIndex === word.length - 1) {
        matches.push((textIndex - word.length) + 1)
      }
      wordIndex += 1;
      textIndex += 1;
    } else if (wordIndex > 0) {
      wordIndex = patternTable[wordIndex - 1];
    } else {
      wordIndex = 0;
      textIndex += 1;
    }
  }
  if(matches.length===0){
    return -1;
  }else{
    return matches
  }
  
}