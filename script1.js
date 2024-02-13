let secretCode = ['R', 'G', 'B', 'Y', 'P']; // Example fixed code
let attempts = 8;

document.getElementById('submitGuess').addEventListener('click', function() {
    if (attempts > 0) {
        let guessInput = document.getElementById('guessInput').value.toUpperCase();
        let guess = guessInput.split('');
        let feedback = checkGuess(guess);

        // Display feedback and update attempts
        displayFeedback(feedback.blackPegs, feedback.whitePegs);
        attempts--;
        document.getElementById('attemptsLeft').textContent = `Attempts left: ${attempts}`;

        // Check win condition
        if (feedback.blackPegs === 5) {
            alert("Congratulations! You've cracked the code!");
            resetGame();
        } else if (attempts === 0) {
            alert("Out of attempts! The game will now reset.");
            resetGame();
        }
    }
});

function checkGuess(guess) {
    let blackPegs = 0, whitePegs = 0;
    let secretCopy = secretCode.slice();

    // Check for black pegs
    guess.forEach((color, index) => {
        if (color === secretCode[index]) {
            blackPegs++;
            guess[index] = secretCopy[index] = null;
        }
    });

    // Check for white pegs
    guess.forEach((color, index) => {
        if (color && secretCopy.includes(color)) {
            whitePegs++;
            secretCopy[secretCopy.indexOf(color)] = null;
        }
    });

    return { blackPegs, whitePegs };
}

function displayFeedback(blackPegs, whitePegs) {
    let feedbackArea = document.getElementById('feedbackArea');
    let feedbackMessage = `Black Pegs: ${blackPegs}, White Pegs: ${whitePegs}`;
    feedbackArea.textContent = feedbackMessage;
}

function resetGame() {
    // Reset game state and UI for a new game
    attempts = 8;
    document.getElementById('guessInput').value = '';
    document.getElementById('feedbackArea').textContent = '';
    document.getElementById('attemptsLeft').textContent = '';
}