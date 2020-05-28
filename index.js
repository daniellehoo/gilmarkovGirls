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
    // console.log(blockText, index)
  index <= splitText.length - (k - 1) ?
    blockText.push(splitText.slice(index, index+k)) : null
  })
  const uniqueBlockWords = [...new Set(blockText)]
  // console.log(blockText)
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
  for (let i = 0; i < uniqueBlockWords.length; i++)
    transitionMatrix[i] = new Array(uniqueWords.length)

  for (let i = 0; i < uniqueBlockWords.length; i++) {
    for (let j = 0; j < uniqueWords.length; j++) {
      transitionMatrix[i][j] = 0
    }
  }

  // SOMETHING WRONG LINES 44-60 !!! 
  for (let x = 0; x < blockText.length - 1; x++) {
    // let nextWordIndex = splitText.indexOf(splitText.indexOf(blockText[x][k])+1)
    // find last word of each block: blockText[x][k]
    // find word following that in splitText
    // console.log(blockText[x])
    // console.log(blockText[x].slice(k-1,k)[0])

    // let nextWordIndex = splitText[splitText.indexOf(blockText[x].slice(k-1,k)) + 1]
    let nextWordIndex = splitText[splitText.indexOf(blockText[x].slice(k-1,k)[0]) + 1] 

    // console.log(nextWordIndex)
    // let nextWordIndex = splitText[x + 1]
    let nextWordColumn = uniqueWords.indexOf(nextWordIndex)
    let nextWordRow = uniqueBlockWords.indexOf(blockText[x])
    transitionMatrix[nextWordRow][nextWordColumn]++
    document.write('\n')
  }
  console.log("before normalising matrix", transitionMatrix)
  
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
  //console.log(transitionMatrix)
  // console.log('uniqueBlockWords', uniqueBlockWords)

  chooseNextWords(uniqueWords, uniqueBlockWords, transitionMatrix)
}

// 1. choose random word from uniqueWords - uniqueWords[i]
// 2. go to i^th row of transitionMatrix
// 3. choose weighted next word from i^th row probabilities
// 4. loop through for desired number of words
function chooseNextWords (uniqueWords, uniqueBlockWords, transitionMatrix) {
  // console.log(uniqueBlockWords)
  let index = Math.floor(Math.random() * uniqueBlockWords.length)
  //console.log("index", index)
  //console.log("uniqueBlockWords[index]", uniqueBlockWords[index])
  let randomFirstBlock = []
  randomFirstBlock = uniqueBlockWords[index].slice()
  // let uniqueBlockWordsArr = uniqueBlockWords
  console.log(randomFirstBlock)
  //console.log(uniqueBlockWordsArr)
  //console.log("index=", index)
  let numberOfWords = 0
  //let valid = 0
  //start while loop 
  while(numberOfWords < 10){
    // for(let numberOfWords=0; numberOfWords < 10; numberOfWords++){
    let weightedArr = []
    transitionMatrix[index].map((probability, i) => {
      if (probability != 0) {
        for (let j = 1; j <= probability * 10; j++) {
          weightedArr.push(uniqueWords[i])
          console.log('uniqueWords', uniqueWords[i])
        }
      }
    })
    //console.log("here's what we choose from:", weightedArr)
    let nextWord = weightedArr[Math.floor(Math.random() * weightedArr.length)]
    //console.log(nextWord)

    //if ((nextWord == '.' || nextWord == '!' || nextWord == '?') && numberOfWords >= 10){
      //valid = 1
      //break
    //}
    
    let newArray = randomFirstBlock.slice(1)
    // console.log('newArray', newArray)
    newArray.push(nextWord)
    //randomFirstBlock.shift()
    //randomFirstBlock.push(nextWord) 
    randomFirstBlock = newArray.slice()

    // index = uniqueBlockWordsArr.indexOf(uniqueBlockWordsArr[index])
    // index =  uniqueBlockWordsArr
    // console.log('indexOfNextWord', index)
    // console.log(nextWord)
    console.log('the next block is', randomFirstBlock)
    for (let i = 0; i < uniqueBlockWords.length; i++){
      //console.log("uniqueBlockWords[i]=", uniqueBlockWords[i])
      //console.log("randomFirstBlock=", randomFirstBlock)
      //if (uniqueBlockWords[i] == randomFirstBlock){
      if (JSON.stringify(uniqueBlockWords[i]) == JSON.stringify(randomFirstBlock)){ 
        index = i
        //console.log("it's found it!")
        break
      }
    }
    //index = uniqueBlockWords.indexOf(randomFirstBlock)
    //console.log("uniqueBlockWords:", uniqueBlockWords)
    //console.log("randomFirstBlock:", randomFirstBlock)
    //console.log("the index of the next block is", index)
    numberOfWords += 1
  }
}

wordArray()


// to do:
// update chooseNextWords to give us next word after unique block words (update random index for each instance)
// need to choose the correct next block of words (line 107)
// get more quotes!