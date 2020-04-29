// list gilmore girls quotes
const quotes =
  'I need coffee. Extra strong. Double caf. Triple caf. No, forget the caf. Throw in the whole cow and serve it to this man right here!'

//declare global variables
const k = 2;

// to do: map over array of quotes
// convert to lowercase, split text on spaces and save as array
// split the text into blocks of k words
// filter out duplicate words
function wordArray () {
  const splitText = quotes.toLowerCase().split(/\s*\b\s*/)
  const uniqueWords = [...new Set(splitText)]
  const blockText = [];
  splitText.map((block, index) => {
  index <= splitText.length - k ?
    blockText.push(splitText.slice(index, index+k)) : null
  })
  const uniqueBlockWords = [...new Set(blockText)]
  createTransitionMatrix(splitText, uniqueWords, blockText, uniqueBlockWords)
}

// create an empty matrix with:
// no. of rows corresponding to the length of uniqueBlockWords
// no. of columns corresponding to length of the uniqueWords
// for each word i in splitText:
//   1. find the following (i+1)^th word (entry) splitText[i + 1]
//   2. for the i^th and (i+1)^th words, find the index in uniqueWords - j and k
//   3. add 1 to the element of transitionmatrix[j][k]
function createTransitionMatrix (splitText, uniqueWords, blockText, uniqueBlockWords) {
  let transitionMatrix = new Array(uniqueBlockWords.length)
  for (i = 0; i < uniqueBlockWords.length; i++)
    transitionMatrix[i] = new Array(uniqueWords.length)

  for (i = 0; i < uniqueBlockWords.length; i++) {
    for (j = 0; j < uniqueWords.length; j++) {
      transitionMatrix[i][j] = 0
    }
  }

  for (let x = 0; x < blockText.length - 1; x++) {
    // let nextWordIndex = splitText.indexOf(splitText.indexOf(blockText[x][k])+1)
    // find last word of each block: blockText[x][k]
    // find word following that in splitText
    // console.log(blockText[x])
    // console.log(blockText[x].slice(k-1,k)[0])

    // let nextWordIndex = splitText[splitText.indexOf(blockText[x].slice(k-1,k)) + 1]
    let nextWordIndex = splitText[splitText.indexOf(blockText[x].slice(k-1,k)[0]) + 1] 

    console.log(nextWordIndex)
    // let nextWordIndex = splitText[x + 1]
    let nextWordColumn = uniqueWords.indexOf(nextWordIndex)
    let nextWordRow = uniqueBlockWords.indexOf(blockText[x])
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
  console.log(transitionMatrix)

  chooseNextWords(uniqueWords, uniqueBlockWords, transitionMatrix)
}

// 1. choose random word from uniqueWords - uniqueWords[i]
// 2. go to i^th row of transitionMatrix
// 3. choose weighted next word from i^th row probabilities
// 4. loop through for desired number of words
function chooseNextWords (uniqueWords, uniqueBlockWords, transitionMatrix) {
  let index = Math.floor(Math.random() * uniqueBlockWords.length)
  let randomFirstWord = uniqueBlockWords[index]
  let uniqueBlockWordsArr = uniqueBlockWords
  console.log(randomFirstWord)
  console.log(uniqueBlockWordsArr)
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
    uniqueBlockWordsArr[index].shift()
    console.log(uniqueBlockWordsArr[index])
    uniqueBlockWordsArr[index].push(nextWord) 
    console.log(uniqueBlockWordsArr[index])
    index = uniqueBlockWordsArr.indexOf(uniqueBlockWordsArr[index])
    console.log('indexOfNextWord', index)
    // console.log(nextWord)

    numberOfWords += 1
  }
}

wordArray()


// to do:
// update chooseNextWords to give us next word after unique block words (update random index for each instance)
// get more quotes!