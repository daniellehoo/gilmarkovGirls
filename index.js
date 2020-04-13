// list gilmore girls quotes
const quotes = 
  "I need coffee. Extra strong. Double caf. Triple caf. No, forget the caf. Throw in the whole cow and serve it to this man right here!";

// to do: map over array of quotes
// convert to lowercase, split text on spaces and save as array
// filter out duplicate words
function wordArray() {
    const splitText = quotes.toLowerCase().split(/\s*\b\s*/)
    const uniqueWords = [...new Set(splitText)]
    console.log(uniqueWords)
    createTransitionMatrix(uniqueWords)
}

// create an empty matrix corresponding to length of the unique words array
function createTransitionMatrix(uniqueWords){
    let transitionMatrix = Array(uniqueWords.length).fill(Array(uniqueWords.length).fill(0));
    console.log(transitionMatrix)
}




wordArray();


