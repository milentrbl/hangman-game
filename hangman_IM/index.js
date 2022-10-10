const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];


const wrongLettersSpan = document.createElement('span');
wrongLettersEl.insertAdjacentElement('beforeend', wrongLettersSpan)
wrongLettersEl.insertAdjacentHTML('beforebegin', '<p>Entered wrong letters: </p>')

// Random word
let selectedWord = words[Math.floor(Math.random() * words.length)];
let playable = true;
let correctLetters = [];
let wrongLetters = [];

// Show wrong letters
function wrongLettersEntered() {
    wrongLettersSpan.innerText = wrongLetters;
}

function displayWord() {
    wordEl.innerHTML = `
    ${selectedWord.split('').map(letter => `
        <span class='letter'>
            ${correctLetters.includes(letter) ? letter : ''}
        </span>`).join('')}`;
}


function isWin() {
    let wordArr = selectedWord.split('');
    for(let i = 0; i < wordArr.length; i++) {
        if(!correctLetters.includes(wordArr[i])) return false;
    }
    return true;
}

// Adding figure parts and showing notification
function wrongLettersAddFigureParts() {
    wrongLetters.forEach((letter, idx) => {
        if(figureParts[idx]) figureParts[idx].style.display = 'block';
    })
    if(wrongLetters.length === figureParts.length) {
        popup.style.display = 'flex';
        finalMessage.textContent = 'You Lose...';
        finalMessageRevealWord.textContent = `The word is: ${selectedWord}`;
        playable = false;
    } else if(isWin()) {
        popup.style.display = 'flex';
        finalMessage.textContent = 'Congratulations. You Win...';
        playable = false;
    }
} 



function showNotification() {
    notification.classList.toggle('show');
}



window.addEventListener('keydown', (event) => {
    if(playable) {
        
        if(correctLetters.includes(event.key) || wrongLetters.includes(event.key)) {
            showNotification();
            setTimeout(showNotification, 1000)
        } else if(selectedWord.includes(event.key)) {
            correctLetters.push(event.key);
        } else {
            wrongLetters.push(event.key)
        }
        displayWord();
        wrongLettersEntered();
        wrongLettersAddFigureParts();
    }
})

displayWord();

playAgainBtn.addEventListener('click', () => {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    correctLetters = [];
    wrongLetters = [];
    displayWord();
    playable = true;
    wrongLettersEntered();
    wrongLettersAddFigureParts();
    popup.style.display = 'none';
    figureParts.forEach(item => item.style.display = 'none');
    
})