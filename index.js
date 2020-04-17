// list gilmore girls quotes
const quotes =
  'I need coffee. Extra strong. Double caf. Triple caf. No, forget the caf. Throw in the whole cow and serve it to this man right here!'

// to do: map over array of quotes
// convert to lowercase, split text on spaces and save as array
// filter out duplicate words
function wordArray () {
  const splitText = quotes.toLowerCase().split(/\s*\b\s*/)
  const uniqueWords = [...new Set(splitText)]
  // console.log(uniqueWords)
  createTransitionMatrix(splitText, uniqueWords)
}

// create an empty matrix corresponding to length of the unique words array
function createTransitionMatrix (splitText, uniqueWords) {
  //let transitionMatrix = Array(uniqueWords.length).fill(
    //Array(uniqueWords.length).fill(0)
  //)
  let transitionMatrix;
  for (let i = 0; i < uniqueWords.length; i++){
    for (let j = 0; j < uniqueWords.length; j++){
      transitionMatrix[i][j] = 0
    }
  }
  console.log(transitionMatrix)

  for (let x = 0; x < splitText.length; x++){
    let nextWordIndex = splitText[x + 1]
    console.log('following word', splitText[x + 1])
    let nextWordColumn = uniqueWords.indexOf(nextWordIndex)
    let nextWordRow = uniqueWords.indexOf(splitText[x])
    console.log('nextWordRow', nextWordRow)
    console.log('nextWordColumn', nextWordColumn)
    console.log(x, transitionMatrix[nextWordRow][nextWordColumn]+=1)
    document.write("\n")
  }

  // splitText.map((word, index) => {
  //   let nextWordIndex = splitText[index + 1]
  //   let nextWordColumn = uniqueWords.indexOf(nextWordIndex)
  //   console.log('nextWordColumn', nextWordColumn)
  //   let nextWordRow = uniqueWords.indexOf(word)
  //   console.log('nextWordRow', nextWordRow)
  //   transitionMatrix[0][1] = 1
  //   // console.log('transitionmatrix', transitionMatrix[nextWordRow][nextWordColumn]+=1)
  // })
  
  console.log(transitionMatrix)
}

wordArray()

// for each word i in splittext:
//   1. find the following (i+1)^th word (entry) splitText[i + 1]
//   2. for the i^th and (i+1)^th words, find the index in uniqueWords - j and k
//   3. add 1 to the element of transitionmatrix[j][k]

// // to do:
// 1. for each word i in splitText, find the following (i+1)^th word (entry) splitText[i + 1]
// and return as new array
// 2. a. for the i^th and (i+1)^th words, find the index in uniqueWords - j and k
// 2. b. add 1 to the element of transitionmatrix[j][k]
