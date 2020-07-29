// list gilmore girls quotes
const quotes =
"Hey, I have a New Year's resolution for you: Become more cynical and self-absorbed. You weren't wearing your hot and wealthy sandwich board were you, Mom? Oh! Dinner with Rory! How delightful! Well, spit-spot. Alert the corgis. You can't watch. If you're going to throw your life away, he'd better have a motorcycle. There's plenty to do tonight that we can be mortified about tomorrow. My mother is fast asleep in my bed, clutching my Hello Kitty pillow, and yes, I have pictures. Oh yes, it was beautiful in there. We should commemorate it with an oil painting or a severed head or something. So not only did you go to a cop-raided party, but you started the raid? I need caffeine. Whatever form you've got, I haven't had any all day. I'll drink it, shoot it, eat it, snort it, whatever form it's in, gimme. Cheeseburger, onion rings, and a list of people who killed their parents and got away with it. I’m looking for heroes. I love pudding. I worship it. I have a bowl up on the mantel at home with the Virgin Mary, a glass of wine, and a dollar bill next to it. We need you to look at Kirk's butt. He ran into some rose bushes, and he's got some thorns stuck in it, and I thought of you. When I have made one zillion dollars from my rocket gum invention you will eat those words! Or rather you will chew those words and blow a bubble with them. Why is she taking our coats and pouring us drinks? Did you win her in a poker game? Seventy-five thousand dollars? Oh my God, that’s like 150 pairs of Jimmy Choos. Hey, tomorrow, if you have time, I'm planning on despising everyone who says hey, how's it going? There have been very few moments in my life where I have actually wished I had one of those enormous creme pies you can just smash in somebody's face. But this is definitely one of them. Don't let his family see you. Spiders are vindictive. And this was a really big spider. I think it had a gun. My life stinks. Hey, let’s look into each other’s eyes and say I wish I were you at exactly the same time — maybe we’ll pull a Freaky Friday. I stop drinking coffee, I stop doing the standing and the walking and the words-putting-into-sentence doing. It feels… right. Such a long time getting here… sometimes it’s just a journey, you know? I thought I knew exactly what I wanted, where I was going, what I was doing and why I was doing. But lately, things seem hazier. It's all any of us wants, to find a nice person to hang out with until we drop dead. Not a lot to ask! This is America, where we unapologetically bastardize other countries' cultures in a gross quest for moral and military supremacy. He’s like a superhero, but his power is that you can’t remember him no matter how much time you spend with him. Kind of like every Marvel movie ever. It's my life, Rory. I went through all this effort for many, many years making sure people only knew what I wanted them to know, and now you're going to lay it all out in a book? I sat down and it just came out. Flew out. It's like this story has been sitting in my brain for years, taking up space. Life’s been pretty good to you. It was your turn for a few curveballs. Peaks and valleys, kid. If it was physically possible to make love to a hot beverage, this would be the one. As long as everything is exactly the way I want it, I'm totally flexible. Did anyone ever think that maybe Sylvia Plath wasn't crazy, she was just cold? I don't like problems. I avoid them when I can and I don't like people pointing them out to me. I would like a cheeseburger, with a side of cheeseburger, and see if they can make me a cheeseburger smoothie. Hello is the appropriate way to indicate you're open to a social engagement. Unless, however, you're approaching a weasel. Then I believe the proper signal is just to offer him your hindquarters. Everything in my life has something to do with coffee. I believe in a former life, I was coffee. When I think of blistering thirty-degree burns, I also think of my mother. He called me hot plates. He sooooo likes me. Hey, did you know about urine mints?"

const images = [
  './images/1.jpg',
  './images/2.jpg',
  './images/3.jpg',
  './images/5.jpg',
  './images/7.jpg',
  './images/9.jpg',
  './images/11.jpg',
  './images/12.jpg',
  './images/13.jpg',
  './images/14.jpg',
  './images/15.jpg',
  './images/16.jpg',
  './images/17.jpg',
  './images/18.jpg',
  './images/19.jpg',
  './images/20.jpg'
];

//declare global variables
const k = 2

//function that finds unique elements in multi-dimensional array
function findUnique (arr) {
  var uniques = []
  var itemsFound = {}
  for (var i = 0, l = arr.length; i < l; i++) {
    var stringified = JSON.stringify(arr[i])
    if (itemsFound[stringified]) {
      continue
    }
    uniques.push(arr[i])
    itemsFound[stringified] = true
  }
  return uniques
}

//capitalisation
function caps (formattedSentence) {
  return formattedSentence.replace(/.+?[\.\?\!](\s|$)/g, function (word) {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
  })
}

// to do: map over array of quotes
// convert to lowercase, split text on spaces and save as array
// split the text into blocks of k words
// filter out duplicate words
function wordArray () {
  const splitText = quotes.toLowerCase().split(/\s*\b\s*/)
  const uniqueWords = [...new Set(splitText)]
  const blockText = []
  splitText.map((block, index) => {
    index <= splitText.length - k + 1
      ? blockText.push(splitText.slice(index, index + k))
      : null
  })
  //splitText = ["i", "need", "coffee", ".", "extra", "strong", "."]
  //splitText.slice(0, 0+1) = splitText.slice(0, 1) = ["i"]
  //splitText.slice(0, 0+2) = splitText.slice(0, 2) = ["i", "need"]
  //splitText.slice(0, 0+3) = splitText.slice(0, 3) = ["i", "need", "coffee"]
  //index <= splitText.length - k + 1 = 7 - 2 + 1 = 6
  //index <= splitText.length - k + 1 = 7 - 3 + 1 = 5
  //index <= splitText.length - k + 1 = 7 - 1 + 1 = 7

  //loop through blockText, and add only unique elements to uniqueBlockWords
  const uniqueBlockWords = findUnique(blockText) 
  createTransitionMatrix(splitText, uniqueWords, blockText, uniqueBlockWords)
}

// create an empty matrix with:
// no. of rows corresponding to the length of uniqueBlockWords
// no. of columns corresponding to length of the uniqueWords
// for each word i in splitText:
//   1. find the following (i+1)^th word (entry) splitText[i + 1]
//   2. for the i^th and (i+1)^th words, find the index in uniqueWords - j and k
//   3. add 1 to the element of transitionmatrix[j][k]
function createTransitionMatrix (
  splitText,
  uniqueWords,
  blockText,
  uniqueBlockWords
) {
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

  for (let x = 0; x < blockText.length - 1; x++) {
    let nextWordIndex = blockText[blockText.indexOf(blockText[x]) + 1][1] 
    let nextWordColumn = uniqueWords.indexOf(nextWordIndex)

    //finding index of blockText in uniqueBlockWords
    let nextWordRow = -1
    for (let i = 0; i < uniqueBlockWords.length; i++) {
      if (JSON.stringify(uniqueBlockWords[i]) == JSON.stringify(blockText[x])) {
        nextWordRow = i
        break
      }
    }
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
  let good_word = 0
  let randomFirstBlock = []
  let index = 0

  //choosing a random block to start from
  while (good_word == 0) {
    index = Math.floor(Math.random() * uniqueBlockWords.length)
    let bad_words = [
      'form',
      're',
      've',
      'll',
      's',
      't',
      'm',
      ',',
      '-',
      '.',
      '!',
      '?',
      ':',
      ';',
      "'",
      'and',
      'of',
      '…',
      'was',
      'can',
      '’',
      'has',
      'eyes',
      'about',
      'to',
      'way',
      'is',
      'like',
      'coats'
    ]
    randomFirstBlock = uniqueBlockWords[index].slice()
    bad_words.includes(randomFirstBlock[0]) ? null : (good_word = 1)
  }

  let sentence = []
  sentence.push(randomFirstBlock.join(' '))

  let numberOfWords = 0
  let valid = 0
  while (valid == 0) {
    //weighted array is what we choose from
    let weightedArr = []
    transitionMatrix[index].map((probability, i) => {
      if (probability != 0) {
        for (let j = 1; j <= probability * 100; j++) {
          weightedArr.push(uniqueWords[i])
        }
      }
    })

    //if there are no words to choose from (empty array) end there
    if (weightedArr.length == 0) {
      valid = 1
      break
    }

    //choosing nextWord from weightedArr randomly (the weights are included in the array)
    let nextWord = weightedArr[Math.floor(Math.random() * weightedArr.length)]
    sentence.push(nextWord)

    //if we've reached a good end point and generated enough words, end quote generation
    if (
      (nextWord == '.' || nextWord == '!' || nextWord == '?') &&
      numberOfWords >= 10
    ) {
      valid = 1
      break
    }

    //create new block
    let newArray = randomFirstBlock.slice(1)
    newArray.push(nextWord)
    randomFirstBlock = newArray.slice()

    //find the index of the next block in uniqueBlockWords
    for (let i = 0; i < uniqueBlockWords.length; i++) {
      if (
        JSON.stringify(uniqueBlockWords[i]) == JSON.stringify(randomFirstBlock)
      ) {
        index = i
        break
      }
    }
    numberOfWords += 1
  }

  //sentence formatting (punctuation, spaces, etc)
  let formattedSentence = sentence.join(' ').replace(/\s*,\s*/g, ', ')
  let countries = /countries'/g
  formattedSentence = formattedSentence.replace(/\s*[-]\s*/g, '-')
  formattedSentence = formattedSentence.replace(/\s*[’]\s*/g, '’')
  formattedSentence = formattedSentence.replace(/\s*[']\s*/g, "'")
  formattedSentence = formattedSentence.replace(/\s*[:]\s*/g, ': ')
  formattedSentence = formattedSentence.replace(countries, "countries' ")
  formattedSentence = formattedSentence.replace(/\s*[.]\s*/g, '. ')
  formattedSentence = formattedSentence.replace(/\s*[!]\s*/g, '! ')
  formattedSentence = formattedSentence.replace(/\s*[?]\s*/g, '? ')

  finalSentence = caps(formattedSentence)

  finalSentence = finalSentence.replace(/ i /g, ' I ')
  finalSentence = finalSentence.replace(" i'm ", " I'm ")
  finalSentence = finalSentence.replace(" i'll ", " I'll ")
  finalSentence = finalSentence.replace(' freaky friday', ' Freaky Friday')
  finalSentence = finalSentence.replace(' friday ', ' Friday ')
  finalSentence = finalSentence.replace(' kirk ', ' Kirk ')
  finalSentence = finalSentence.replace(" kirk's ", " Kirk's ")
  finalSentence = finalSentence.replace(' rory', ' Rory')
  finalSentence = finalSentence.replace(' hello kitty ', ' Hello Kitty ')
  finalSentence = finalSentence.replace(" new year's ", " New Year's ")
  finalSentence = finalSentence.replace(' sylvia plath', ' Sylvia Plath')
  finalSentence = finalSentence.replace(' mom ', ' Mom ')
  finalSentence = finalSentence.replace(' america', ' America')
  finalSentence = finalSentence.replace(' marvel', ' Marvel')
  finalSentence = finalSentence.replace(' virgin mary', ' Virgin Mary')
  finalSentence = finalSentence.replace(' jimmy choos', ' Jimmy Choos')

  updateText(finalSentence)
}

function getRandomImage(){
  let image = images[Math.floor(Math.random() * images.length)]
  return image
}  

let button = document.getElementById('button')
button.addEventListener("click", wordArray)

function updateText (finalSentence) {
  finalSentence = finalSentence.slice(0, -1)
  let paragraph = document.getElementById('para').innerHTML = `"${finalSentence}"`
  image = getRandomImage()
  let newImage = document.getElementById('img').src = image
  console.log(newImage)
}

wordArray()

// to do:
// continue to make pretty 
// rory and other capitalization fixes
// deploy!!!