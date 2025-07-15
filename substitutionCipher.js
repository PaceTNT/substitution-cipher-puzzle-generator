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
    const inputPhraseString = (document.getElementById('inputPhrase').value).toUpperCase();
    const inputDisallowedLettersString = (document.getElementById('disallowedLetters').value).toUpperCase();
    const inputSubstitutionShift = (document.getElementById('substitutionShift').value);
    let validationErrors = "";

    validationErrors += validateInputPhrase(inputPhraseString);
    validationErrors += validateDisallowedLetters(inputDisallowedLettersString);

    if (validationErrors.length > 0) {
        showErrorMessage(validationErrors);
        return false;
    }

    const disallowedLettersList = listOfUniqueLetters(inputDisallowedLettersString);
    const neededLettersList = listOfUniqueLetters(inputPhraseString, inputDisallowedLettersString);

    const wordsWithoutDisallowedLetters = listOfWordsWithoutLetters(pictogramList, disallowedLettersList);
    const wordsContainingNeededLetters = findMinimalWordsList(wordsWithoutDisallowedLetters, neededLettersList);

    clearImages();
    displayOutputPhrase(inputPhraseString, disallowedLettersList);
    displayEncodedPhrase(inputPhraseString, inputSubstitutionShift);
    displayPictograms(wordsContainingNeededLetters, inputSubstitutionShift);

    updateURLParams({
        phrase: inputPhraseString,
        disallowed: inputDisallowedLettersString,
        shift: inputSubstitutionShift
    });

    return false;
}

function validateInputPhrase(inputPhraseString) {
    let errors = "";
    
    if (!inputPhraseString || inputPhraseString.trim().length === 0) {
        errors += "Input phrase cannot be empty.\n";
        return errors;
    }
    
    // Check if phrase contains at least one letter
    const hasLetters = /[A-Za-z]/.test(inputPhraseString);
    if (!hasLetters) {
        errors += "Input phrase must contain at least one letter.\n";
    }
    
    // Check for reasonable length (not too long for display)
    if (inputPhraseString.length > 500) {
        errors += "Input phrase is too long (maximum 500 characters).\n";
    }
    
    return errors;
}

function validateDisallowedLetters(inputDisallowedLettersString) {
    let errors = "";
    
    if (inputDisallowedLettersString.trim().length === 0) {
        return errors; // Empty is allowed
    }
    
    // Remove spaces and commas, then check if all characters are letters
    const cleanedInput = inputDisallowedLettersString.replace(/[,\s]/g, '');
    const invalidChars = cleanedInput.match(/[^A-Za-z]/g);
    
    if (invalidChars) {
        errors += `Invalid characters in disallowed letters: ${[...new Set(invalidChars)].join(', ')}\n`;
    }
    
    // Check if disallowed letters would eliminate all pictograms
    const disallowedLettersList = listOfUniqueLetters(inputDisallowedLettersString);
    const wordsWithoutDisallowedLetters = listOfWordsWithoutLetters(pictogramList, disallowedLettersList);
    
    if (wordsWithoutDisallowedLetters.length === 0) {
        errors += "Disallowed letters eliminate all available pictograms. Please reduce the number of disallowed letters.\n";
    }
    
    return errors;
}

/**
 * Display error message to user with better formatting than alert
 * @param {string} message - The error message to display
 */
function showErrorMessage(message) {
    // For now, use alert but format the message better
    // TODO: Replace with a proper modal or toast notification
    const formattedMessage = "Please fix the following issues:\n\n" + message;
    alert(formattedMessage);
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

function displayPictograms(wordsList, inputSubstitutionShift) {
    const pictogramDiv = document.getElementById('pictogramDiv');

    for (let i = 0; i < wordsList.length; i++) {
        addPictogramToDiv(pictogramDiv, wordsList[i], inputSubstitutionShift);
    }
}

function addPictogramToDiv(parentDiv, word, inputSubstitutionShift) {
    const table = document.createElement('table');
    table.setAttribute("border", "2");

    const pictogramDiv = document.createElement('div');
    pictogramDiv.setAttribute("class", "pictogramDiv");
    const img = document.createElement('img');
    img.src = "pictograms/" + word.toLowerCase() + ".jpg";
    img.alt = `Pictogram for ${word}`;
    pictogramDiv.appendChild(img);
    table.appendChild(pictogramDiv);

    const labelDiv = document.createElement('div');
    labelDiv.setAttribute("class", "pictogramDiv");
    for(let i = 0; i < word.length; i++){
        const labelImg = document.createElement('img');      
        const shiftedLetter = getShiftedLetter(word[i], inputSubstitutionShift);
        labelImg.src = "glyphs/" + shiftedLetter + ".jpg";
        labelImg.alt = `Glyph for letter ${shiftedLetter}`;
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

function displayEncodedPhrase(inputPhraseString, inputSubstitutionShift){
    const encodedOutputContainer = document.getElementById('encodedOutputContainer');
    
    // Create a table element inside the container
    const encodedOutputTable = document.createElement('table');
    encodedOutputTable.setAttribute('class', 'encoded-phrase-table');
    encodedOutputContainer.appendChild(encodedOutputTable);

    const extraSpacesAdded = addExtraSpaces(inputPhraseString);

    let row = encodedOutputTable.insertRow();
    for(let i = 0; i < extraSpacesAdded.length; i++){
        if(extraSpacesAdded[i] == "\n"){
            row = encodedOutputTable.insertRow();
            continue;
        }
        const labelCell = row.insertCell();
        labelCell.setAttribute("class", "encodedOutputCell");
        
        const labelImg = document.createElement('img');
        labelImg.setAttribute("class", "glyph");

        const shiftedLetter = getShiftedLetter(extraSpacesAdded[i], inputSubstitutionShift);
        labelImg.src = "glyphs/" + shiftedLetter + ".jpg";
        labelImg.alt = `Glyph for letter ${shiftedLetter}`;
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

function updateURLParams(params) {
    const url = new URL(window.location.href);
    for (const key in params) {
        url.searchParams.set(key, params[key]);
    }
    window.history.replaceState({}, '', url.toString()); // Update the URL without reloading
}

function loadURLParams() {
    const url = new URL(window.location.href);
    const phrase = url.searchParams.get('phrase');
    const disallowed = url.searchParams.get('disallowed');
    const shift = url.searchParams.get('shift');

    if (phrase) {
        document.getElementById('inputPhrase').value = phrase;
    }
    if (disallowed) {
        document.getElementById('disallowedLetters').value = disallowed;
    }
    if (shift) {
        document.getElementById('substitutionShift').value = shift;
    }

    processMyInput(null); // Re-run the processing with loaded parameters
}

// Call loadURLParams when the page loads
window.onload = loadURLParams;
