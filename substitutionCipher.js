const pictogramList = [
    "cow",
    "cat",
    "dog",
    "fox",
    "pig",
    "rat",
    "ant",
    "bee",
    "bat",
    "bird",
    "deer",
    "fish",
    "goat",
    "slug",
    "lion",
    "mouse",
    "snake",
    "bear",
    "seal",
    "swan",
    "duck",
    "rain",
    "cloud",
    "horse",
    "koala",
    "panda",
    "sheep",
    "tiger",
    "turtle",
    "elephant",
    "giraffe",
    "monkey",
    "penguin",
    "rabbit",
    "wolf",
    "zebra",
    "zoo",
    "jump",
    "queen",
    "snow",
    "violin",
    "kangaroo",
    "bull",
    "crab",
    "dolphin",
    "boat",
    "book",
    "fly",
    "fork",
    "spoon",
    "archer",
    "sad",
    "happy",
];

function processMyInput(formData) {
    var inputPhraseString = (document.getElementById('inputPhrase').value).toUpperCase();
    var inputDisallowedLettersString = (document.getElementById('disallowedLetters').value).toUpperCase();
    var inputSubstituionShift = (document.getElementById('substitutionShift').value);
    var validationErrors = "";

    validationErrors += validateInputPhrase(inputPhraseString);
    validationErrors += validateDisallowedLetters(inputDisallowedLettersString);

    if (validationErrors.length > 0) {
        alert(validationErrors);
        return false;
    }

    const disallowedLettersList = listOfUniqueLetters(inputDisallowedLettersString);
    const neededLettersList = listOfUniqueLetters(inputPhraseString, inputDisallowedLettersString);

    const wordsWithoutDisallowedLetters = listOfWordsWithoutLetters(pictogramList, disallowedLettersList);
    const wordsContainingNeededLetters = findMinimalWordsList(wordsWithoutDisallowedLetters, neededLettersList);

    clearImages();
    displayOutputPhrase(inputPhraseString, disallowedLettersList);
    displayEncodedPhrase(inputPhraseString, inputSubstituionShift);
    displayPictograms(wordsContainingNeededLetters, inputSubstituionShift);
    return false;
}

function validateInputPhrase(inputPhraseString) {
    return "";
}

function validateDisallowedLetters(inputDisallowedLettersString) {
    return "";
}

function listOfUniqueLetters(inputString, disallowedLettersString = "") {
    // Use a Set to store unique letters
    const uniqueLetters = new Set();

    // Iterate through the characters in the uppercase string
    for (let i = 0; i < inputString.length; i++) {
        const char = inputString[i];
        if (/[A-Z]/.test(char) && !disallowedLettersString.includes(char)) {
            // Check if the character is an uppercase letter
            uniqueLetters.add(char);
        }
    }

  // Convert the Set to an array and return it
  return Array.from(uniqueLetters);
}

function findWordThatMatchesMostLetters(wordList, lettersList) {
    const letterCount = {};

    // Iterate through each word in the word list
    for (let i = 0; i < wordList.length; i++) {
        const word = wordList[i];
        for(let j = 0; j < lettersList.length; j++){
            const letter = lettersList[j];
            if(word.includes(letter)){
                letterCount[word] = (letterCount[word] || 0) + 1;
            }
        }
    }

    // Words with the most number of matching letters at the front
    wordList.sort((a, b) => (letterCount[b] || 0) - (letterCount[a] || 0));

    return wordList[0];
}

function getListOfLettersMinusThoseInWord(word, lettersList) {
    const outputLetterList = [];
    for(let i = 0; i < lettersList.length; i++){
        if(!word.includes(lettersList[i])){
            outputLetterList.push(lettersList[i]);
        }
    }

    return outputLetterList;
}

function findMinimalWordsList(wordList, lettersList) {
    const minimalWordList = [];

    while((wordList.length > 0) && (lettersList.length > 0)){
        const word = findWordThatMatchesMostLetters(wordList, lettersList);
        minimalWordList.push(word);
        const index = wordList.indexOf(word);
        if (index > -1) {
            wordList.splice(index, 1);
        }

        lettersList = getListOfLettersMinusThoseInWord(word, lettersList);
    }

    if(lettersList.length > 0){
        alert("Error: Not enough words to match all letters.\n Remaining letters: " + lettersList.toString());
    }

    return minimalWordList
}


function listOfWordsContainingLetters(wordList, lettersList) {
    const wordsContainingLetters = [];
    for(let i = 0; i < wordList.length; i++){
        const word = wordList[i].toUpperCase();
        for(let j = 0; j < lettersList.length; j++){
            const letter = lettersList[j];
            if(word.includes(letter)){
                wordsContainingLetters.push(word);
                break;
            }
        }
    }

    return wordsContainingLetters;
}


function listOfWordsWithoutLetters(wordsList, disallowedLettersList) {
    const wordsWithoutDisallowedLetters = [];
    for(let i = 0; i < wordsList.length; i++){
        const word = wordsList[i].toUpperCase();
        let containsDisallowedLetter = false;
        for(let j = 0; j < disallowedLettersList.length; j++){
            const letter = disallowedLettersList[j];
            if(word.includes(letter)){
                containsDisallowedLetter = true;
                break;
            }
        }
        if(!containsDisallowedLetter){
            wordsWithoutDisallowedLetters.push(word);
        }
    }

    return wordsWithoutDisallowedLetters;
}

function displayOutputPhrase(inputPhraseString, disallowedLettersList){
    const outputPhrase = document.getElementById('outputPhrase');
    outputPhrase.innerHTML = "";
    for(let i = 0; i < inputPhraseString.length; i++){
        const letter = inputPhraseString[i].toUpperCase();
        if(disallowedLettersList.includes(letter)){
            outputPhrase.innerHTML += "_";
        }
        else if(letter == " "){
            outputPhrase.innerHTML += "   ";
        }
        else{
            outputPhrase.innerHTML += letter;
        }
    }
}

function displayPictograms(wordsList, inputSubstituionShift) {
    const pictogramDiv = document.getElementById('pictogramDiv');

    for (let i = 0; i < wordsList.length; i++) {
        addPictogramToDiv(pictogramDiv, wordsList[i], inputSubstituionShift);
    }
}

function addPictogramToDiv(parentDiv, word, inputSubstituionShift) {
    const table = document.createElement('table');
    table.setAttribute("border", "2");

    const pictogramDiv = document.createElement('div');
    pictogramDiv.setAttribute("class", "pictogramDiv");
    const img = document.createElement('img');
    img.src = "pictograms/" + word.toLowerCase() + ".jpg";
    pictogramDiv.appendChild(img);
    table.appendChild(pictogramDiv);

    const labelDiv = document.createElement('div');
    labelDiv.setAttribute("class", "pictogramDiv");
    for(let i = 0; i < word.length; i++){
        const labelImg = document.createElement('img');      
        var shiftedLetter = getShiftedLetter(word[i], inputSubstituionShift);
        labelImg.src = "glyphs/" + shiftedLetter + ".jpg";
        labelDiv.appendChild(labelImg);
    }
    table.appendChild(labelDiv);
    parentDiv.appendChild(table);
}

function getShiftedLetter(letter, shift){
    var outputLetter = "blank";
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const index = alphabet.indexOf(letter);
    if(index >= 0){
        const shiftedIndex = (index + Number(shift)) % 26;
        outputLetter = alphabet[shiftedIndex];
    }
    
    return outputLetter;
}

function addExtraSpaces(inputPhraseString){
    var outputString = "";
    for(let i = 0; i < inputPhraseString.length; i++){
        if(inputPhraseString[i] == " "){
            outputString += "  ";
        }
        else{
            outputString += inputPhraseString[i];
        }
    }

    return outputString;
}

function displayEncodedPhrase(inputPhraseString, inputSubstituionShift){
    const encodedOutputTable = document.getElementById('encodedOutputContainer');

    const extraSpacesAdded = addExtraSpaces(inputPhraseString);

    var row = encodedOutputTable.insertRow();
    for(i = 0; i < extraSpacesAdded.length; i++){
        if(extraSpacesAdded[i] == "\n"){
            row = encodedOutputTable.insertRow();
            continue;
        }
        var labelCell = row.insertCell();
        labelCell.setAttribute("class", "encodedOutputCell");
        
        const labelImg = document.createElement('img');
        labelImg.setAttribute("class", "glyph");

        var shiftedLetter = getShiftedLetter(extraSpacesAdded[i], inputSubstituionShift);
        labelImg.src = "glyphs/" + shiftedLetter + ".jpg";
        labelCell.appendChild(labelImg);
    }
}

function clearImages() {
    const imageTable = document.getElementById('pictogramDiv');
    while(imageTable.firstChild){
        imageTable.removeChild(imageTable.firstChild);
    }

    const encodedOutputTable = document.getElementById('encodedOutputContainer');
    while(encodedOutputTable.firstChild){
        encodedOutputTable.removeChild(encodedOutputTable.firstChild);
    }
}

function clearInput() {
    document.getElementById('inputPhrase').value = "";
    document.getElementById('disallowedLetters').value = "";
    document.getElementById('substitutionShift').value = "0";
    clearImages();
}
