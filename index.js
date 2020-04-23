// list gilmore girls quotes
const quotes =
  'I need coffee. Extra strong. Double caf. Triple caf. No, forget the caf. Throw in the whole cow and serve it to this man right here!'

//declare global variables
//let transitionMatrix = [];

// to do: map over array of quotes
// convert to lowercase, split text on spaces and save as array
// filter out duplicate words
function wordArray () {
  const splitText = quotes.toLowerCase().split(/\s*\b\s*/)
  const uniqueWords = [...new Set(splitText)]
  createTransitionMatrix(splitText, uniqueWords)
  //chooseNextWords(uniqueWords)
}

// create an empty matrix corresponding to length of the unique words array
// for each word i in splitText:
//   1. find the following (i+1)^th word (entry) splitText[i + 1]
//   2. for the i^th and (i+1)^th words, find the index in uniqueWords - j and k
//   3. add 1 to the element of transitionmatrix[j][k]
function createTransitionMatrix (splitText, uniqueWords) {
  let transitionMatrix = new Array(uniqueWords.length)
  for (i = 0; i < uniqueWords.length; i++)
    transitionMatrix[i] = new Array(uniqueWords.length)

  for (i = 0; i < uniqueWords.length; i++) {
    for (j = 0; j < uniqueWords.length; j++) {
      transitionMatrix[i][j] = 0
    }
  }

  for (let x = 0; x < splitText.length - 1; x++) {
    let nextWordIndex = splitText[x + 1]
    let nextWordColumn = uniqueWords.indexOf(nextWordIndex)
    let nextWordRow = uniqueWords.indexOf(splitText[x])
    transitionMatrix[nextWordRow][nextWordColumn]++
    document.write('\n')
  }

  // 1. build probability matrix (convert transition matrix to probability)
  // 1 a. find sum of row--loop through each element
  // 1 b. divide each element by the sum of its row
  // 1 c. replace values in matrix
  transitionMatrix.map((row, i) => {
    let reducer = (accumulator, currentValue) => accumulator + currentValue
    let rowSum = row.reduce(reducer)
    row.map((value, j) => {
      rowSum != 0 ? (transitionMatrix[i][j] = value / rowSum) : null
    })
  })
  // console.log(transitionMatrix)

  chooseNextWords(uniqueWords, transitionMatrix)
}

// 1. choose random word from uniqueWords - uniqueWords[i]
// 2. go to i^th row of transitionMatrix
// 3. choose weighted next word from i^th row probabilities
// 4. loop through for desired number of words
function chooseNextWords (uniqueWords, transitionMatrix) {
  let index = Math.floor(Math.random() * uniqueWords.length)
  let randomFirstWord = uniqueWords[index]
  console.log(randomFirstWord)
  let numberOfWords = 0

  //start while loop 
  while(numberOfWords < 10){
    let weightedArr = []
    transitionMatrix[index].map((probability, i) => {
      if (probability != 0) {
        for (let j = 1; j <= probability * 10; j++) {
          weightedArr.push(uniqueWords[i])
        }
      }
    })
    //console.log(weightedArr)index
    let nextWord = weightedArr[Math.floor(Math.random() * weightedArr.length)]
    index = uniqueWords.indexOf(nextWord)
    //console.log('indexOfNextWord', index)
    console.log(nextWord)
    numberOfWords += 1
  }
}

wordArray()


// to do:
// look at bigger sequences of words before predicting next word (right now, we've looked at one word at a time)
// get more quotes!