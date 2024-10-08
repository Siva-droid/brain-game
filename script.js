// Firebase configuration
const firebaseConfig = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
    databaseURL: 'https://YOUR_PROJECT_ID.firebaseio.com',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_PROJECT_ID.appspot.com',
    messagingSenderId: 'YOUR_SENDER_ID',
    appId: 'YOUR_APP_ID'
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);

document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('next-challenge').addEventListener('click', nextChallenge);
document.getElementById('restart-button').addEventListener('click', restartGame);

const challenges = [
    { type: 'left', question: 'What is 57 + 68?', answer: '125' },
    { type: 'left', question: 'Unscramble: DOLWSRA', answer: 'WORLD' },
    { type: 'right', question: 'Draw a fantastical creature', answer: 'drawing' },
    { type: 'right', question: 'Create a short story with: cat, spaceship, rainbow', answer: 'story' },
];

let currentChallenge = 0;
let leftScore = 0;
let rightScore = 0;

function startGame() {
    document.getElementById('title-screen').classList.add('hidden');
    document.getElementById('challenges').classList.remove('hidden');
    nextChallenge();
}

function nextChallenge() {
    if (currentChallenge < challenges.length) {
        const challenge = challenges[currentChallenge];
        document.getElementById('challenge-container').innerHTML = `<p>${challenge.question}</p>`;
        currentChallenge++;
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('challenges').classList.add('hidden');
    document.getElementById('results').classList.remove('hidden');
    const resultMessage = leftScore > rightScore ? 'You are a Left-Brain Thinker!' :
                          rightScore > leftScore ? 'You are a Right-Brain Thinker!' :
                          'You are Balanced!';
    document.getElementById('result-message').textContent = resultMessage;

    // Save results to Firebase
    const playerId = generateUniqueId(); // Function to generate a unique ID for each player
    database.ref('players/' + playerId).set({
        score: leftScore > rightScore ? 'Left' : (rightScore > leftScore ? 'Right' : 'Balanced'),
        timestamp: new Date().toISOString()
    });
}

function generateUniqueId() {
    return 'player-' + Math.random().toString(36).substr(2, 9);
}

function restartGame() {
    currentChallenge = 0;
    leftScore = 0;
    rightScore = 0;
    document.getElementById('results').classList.add('hidden');
    document.getElementById('title-screen').classList.remove('hidden');
}
