// list gilmore girls quotes
const quotes =
  'I need coffee. Extra strong. Double caf. Triple caf. No, forget the caf. Throw in the whole cow and serve it to this man right here!'

//declare global variables
const k = 2;

//function that finds unique elements in multi-dimensional array 
function findUnique(arr) {
  var uniques = [];
  var itemsFound = {};
  for(var i = 0, l = arr.length; i < l; i++) {
      var stringified = JSON.stringify(arr[i]);
      if(itemsFound[stringified]){ 
        continue; 
      }
      uniques.push(arr[i]);
      itemsFound[stringified] = true;
  }
  return uniques;
}

// to do: map over array of quotes
// convert to lowercase, split text on spaces and save as array
// split the text into blocks of k words
// filter out duplicate words
function wordArray () {
  const splitText = quotes.toLowerCase().split(/\s*\b\s*/)
  const uniqueWords = [...new Set(splitText)]
  const blockText = [];
  splitText.map((block, index) => {
  index <= splitText.length - k ? ///////NEW!!
  //index <= splitText.length - (k - 1) ?
    blockText.push(splitText.slice(index, index+k)) : null
  })
  
  //loop through blockText, and add only unique elements to uniqueBlockWords
  const uniqueBlockWords = findUnique(blockText) //////NEW!!
  //const uniqueBlockWords = [...new Set(blockText)] //this isn't giving us uniqueBlockWords

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

  //number of rows of transitionMatrix = number of uniqueBlockWords
  let transitionMatrix = new Array(uniqueBlockWords.length)
  //number of columns of transitionMatrix = number of uniqueWords 
  for (let i = 0; i < uniqueBlockWords.length; i++)
    transitionMatrix[i] = new Array(uniqueWords.length)

  //initialise every element to 0 
  for (let i = 0; i < uniqueBlockWords.length; i++) {
    for (let j = 0; j < uniqueWords.length; j++) {
      transitionMatrix[i][j] = 0
    }
  }

  // SOMETHING WRONG LINES 44-60 !!! 
  for (let x = 0; x < blockText.length - 1; x++) {
    //console.log("finding the word after", blockText[x])

    let nextWordIndex = blockText[blockText.indexOf(blockText[x])+1][1] ////////NEW!!
    //let nextWordIndex = splitText[splitText.indexOf(blockText[x].slice(k-1,k)[0]) + 1] 
    //console.log("it's", nextWordIndex)

    let nextWordColumn = uniqueWords.indexOf(nextWordIndex)

    ////////// NEW starts 
    //finding index of blockText in uniqueBlockWords
    let nextWordRow = -1 
    //let nextWordRow = uniqueBlockWords.indexOf(blockText[x])
    for (let i = 0; i < uniqueBlockWords.length; i++){
      if (JSON.stringify(uniqueBlockWords[i]) == JSON.stringify(blockText[x])){ 
        nextWordRow = i
        break
      }
    }
    ////////// NEW ends 

    transitionMatrix[nextWordRow][nextWordColumn]++
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

  chooseNextWords(uniqueWords, uniqueBlockWords, transitionMatrix)
}

// 1. choose random word from uniqueWords - uniqueWords[i]
// 2. go to i^th row of transitionMatrix
// 3. choose weighted next word from i^th row probabilities
// 4. loop through for desired number of words
function chooseNextWords (uniqueWords, uniqueBlockWords, transitionMatrix) {

  //choosing a random block to start from 
  let index = Math.floor(Math.random() * uniqueBlockWords.length)
  let randomFirstBlock = []
  randomFirstBlock = uniqueBlockWords[index].slice()
  console.log(randomFirstBlock.join('\n')) //////NEW!! printing as string not array 

  let numberOfWords = 0
  let valid = 0
  while(valid == 0){

    //weighted array is what we choose from 
    let weightedArr = []
    transitionMatrix[index].map((probability, i) => {
      if (probability != 0) {
        for (let j = 1; j <= probability * 10; j++) {
          weightedArr.push(uniqueWords[i])
        }
      }
    })

    //////NEW starts 
    //if there are no words to choose from (empty array) end there 
    if (weightedArr.length == 0){
      valid = 1
      break
    }
    ///////NEW ends 

    //choosing nextWord from weightedArr randomly (the weights are included in the array)
    let nextWord = weightedArr[Math.floor(Math.random() * weightedArr.length)]
    console.log(nextWord)

    //if we've reached a good end point and generated enough words, end quote generation
    if ((nextWord == '.' || nextWord == '!' || nextWord == '?') && numberOfWords >= 10){
      valid = 1
      break
    }
  
    //create new block 
    let newArray = randomFirstBlock.slice(1)
    newArray.push(nextWord)
    randomFirstBlock = newArray.slice()

    //find the index of the next block in uniqueBlockWords
    for (let i = 0; i < uniqueBlockWords.length; i++){
      //if (uniqueBlockWords[i] == randomFirstBlock){
      if (JSON.stringify(uniqueBlockWords[i]) == JSON.stringify(randomFirstBlock)){ 
        index = i
        break
      }
    }
    //index = uniqueBlockWords.indexOf(randomFirstBlock)
    numberOfWords += 1
  }
}

wordArray()


// to do:
// update chooseNextWords to give us next word after unique block words (update random index for each instance)
// need to choose the correct next block of words (line 107)
// get more quotes!