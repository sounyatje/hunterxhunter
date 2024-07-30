const BTN_ENHANCEMENT = document.getElementById('enhancement');
const BTN_MANIPULATION = document.getElementById('manipulation');
const BTN_EMISSION = document.getElementById('emission');
const BTN_REJOUER = document.getElementById('rejouer');
const BTN_EFFACER = document.getElementById('effacer');
const RESULT = document.querySelector('.result');
const SCORE_ACTUEL_JOUEUR = document.getElementById('scoreactuelJoueur');
const SCORE_ACTUEL_COMPUTER = document.getElementById('scoreactuelComputer');
const SCORE_TOTAL_JOUEUR = document.getElementById('yourtotalScore');
const SCORE_TOTAL_COMPUTER = document.getElementById('computertotalScore');
const COMPUTER_SELECTION = document.getElementById('computerSelection');

let scoreActuelJoueur = 0;
let scoreActuelComputer = 0;
let scoreTotalJoueur = 0;
let scoreTotalComputer = 0;

function disableButtons(exceptButton) {
    BTN_ENHANCEMENT.classList.add('disabled');
    BTN_MANIPULATION.classList.add('disabled');
    BTN_EMISSION.classList.add('disabled');

    exceptButton.classList.remove('disabled');
}

function enableButtons() {
    BTN_ENHANCEMENT.classList.remove('disabled');
    BTN_MANIPULATION.classList.remove('disabled');
    BTN_EMISSION.classList.remove('disabled');
}

function saveScores() {
    localStorage.setItem('scoreTotalJoueur', scoreTotalJoueur);
    localStorage.setItem('scoreTotalComputer', scoreTotalComputer);
}

function loadScores() {
    scoreTotalJoueur = parseInt(localStorage.getItem('scoreTotalJoueur')) || 0;
    scoreTotalComputer = parseInt(localStorage.getItem('scoreTotalComputer')) || 0;

    SCORE_TOTAL_JOUEUR.textContent = scoreTotalJoueur;
    SCORE_TOTAL_COMPUTER.textContent = scoreTotalComputer;
}

window.onload = loadScores;

function verifierGagnant() {
    if (scoreActuelJoueur === 3) {
        RESULT.textContent = 'you win the game bro 😎!';
        scoreTotalJoueur++;
        SCORE_TOTAL_JOUEUR.textContent = scoreTotalJoueur;
        saveScores();
        resetGame();
    } else if (scoreActuelComputer === 3) {
        RESULT.textContent = "you loser hahaha 😏!";
        scoreTotalComputer++;
        SCORE_TOTAL_COMPUTER.textContent = scoreTotalComputer;
        saveScores();
        resetGame();
    }
}

function resetGame() {
    scoreActuelJoueur = 0;
    scoreActuelComputer = 0;

    SCORE_ACTUEL_JOUEUR.textContent = scoreActuelJoueur;
    SCORE_ACTUEL_COMPUTER.textContent = scoreActuelComputer;

    enableButtons();
}

function jouer(playerChoice, button) {
    disableButtons(button);

    const choices = ['enhancement', 'manipulation', 'emission'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerChoice = choices[randomIndex];

    let imgSrc;
    if (computerChoice === 'enhancement') {
        imgSrc = 'reforcement.webp';
    } else if (computerChoice === 'manipulation') {
        imgSrc = 'manipulation.webp';
    } else {
        imgSrc = 'emission.png';
    }

    COMPUTER_SELECTION.innerHTML = `<img src="${imgSrc}" alt="${computerChoice}">`;

    let winner = playerChoice === computerChoice ? 'draw' :
        (playerChoice === 'manipulation' && computerChoice === 'enhancement') ||
        (playerChoice === 'enhancement' && computerChoice === 'emission') ||
        (playerChoice === 'emission' && computerChoice === 'manipulation') ? 'player' : 'computer';

    if (winner === 'player') {
        scoreActuelJoueur++;
        RESULT.textContent = 'you win this round!';
    } else if (winner === 'computer') {
        scoreActuelComputer++;
        RESULT.textContent = 'you lose this round!';
    } else {
        RESULT.textContent = 'draw!';
    }

    SCORE_ACTUEL_JOUEUR.textContent = scoreActuelJoueur;
    SCORE_ACTUEL_COMPUTER.textContent = scoreActuelComputer;

    verifierGagnant(); // Vérifier s'il y a un gagnant

    setTimeout(enableButtons, 2000); // Réactiver les boutons après 2 secondes
}

BTN_ENHANCEMENT.addEventListener('click', () => jouer('enhancement', BTN_ENHANCEMENT));
BTN_MANIPULATION.addEventListener('click', () => jouer('manipulation', BTN_MANIPULATION));
BTN_EMISSION.addEventListener('click', () => jouer('emission', BTN_EMISSION));

BTN_EFFACER.addEventListener('click', () => {
    scoreTotalJoueur = 0;
    scoreTotalComputer = 0;

    localStorage.setItem('scoreTotalJoueur', scoreTotalJoueur);
    localStorage.setItem('scoreTotalComputer', scoreTotalComputer);

    SCORE_TOTAL_JOUEUR.textContent = scoreTotalJoueur;
    SCORE_TOTAL_COMPUTER.textContent = scoreTotalComputer;

    enableButtons(); // Activer les boutons pour recommencer une partie
});

BTN_REJOUER.addEventListener('click', () => {
    resetGame();
    RESULT.textContent = 'PRESS ON A PICTURE TO START THE GAME'; // Remettre le texte initial
});
