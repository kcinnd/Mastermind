document.addEventListener('DOMContentLoaded', function() {
    // Toggle instructions
    document.getElementById('toggleInstructions').addEventListener('click', function() {
        var instructions = document.getElementById('gameInstructions');
        if (instructions.style.display === 'none') {
            instructions.style.display = 'block';
            this.textContent = 'Hide Instructions';
        } else {
            instructions.style.display = 'none';
            this.textContent = 'Show Instructions';
        }
    });

    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'cyan', 'magenta', 'lime', 'pink'];
    let selectedColor = '';
    let currentRow = 0;
    const secretCode = generateSecretCode(); // Implement this function based on your game's logic

    setupGame();

    function setupGame() {
        setupColorSelection();
        setupGameBoard();
    }

    function setupColorSelection() {
        const colorSelection = document.getElementById('colorSelection');
        colorSelection.innerHTML = ''; // Clear out the previous color selections
        colors.forEach(color => {
            const peg = document.createElement('div');
            peg.classList.add('peg', color);
            peg.addEventListener('click', () => selectColor(color));
            colorSelection.appendChild(peg);
        });
    }

    function setupGameBoard() {
        const gameBoard = document.getElementById('gameBoard');
        gameBoard.innerHTML = ''; // Clear out the previous board
        for (let i = 0; i < 8; i++) { // Assuming 8 rows for 8 guesses
            const row = document.createElement('div');
            row.classList.add('row');
            for (let j = 0; j < 5; j++) { // Assuming 5 pegs per row
                const pegSlot = document.createElement('div');
                pegSlot.classList.add('peg', 'pegSlot');
                pegSlot.addEventListener('click', function() { placePeg(this); });
                row.appendChild(pegSlot);
            }
            gameBoard.appendChild(row);
        }
    }

    function selectColor(color) {
        selectedColor = color;
    }

    function placePeg(pegSlot) {
        if (selectedColor && pegSlot.classList.contains('pegSlot') && pegSlot.closest('.row') === document.querySelectorAll('.row')[currentRow]) {
            pegSlot.classList.remove('pegSlot');
            pegSlot.classList.add(selectedColor);
            checkRowCompletion();
        }
    }

    function checkRowCompletion() {
        const pegs = document.querySelectorAll('.row')[currentRow].querySelectorAll('.peg:not(.pegSlot)');
        if (pegs.length === 5) {
            document.getElementById('submitGuessBtn').disabled = false;
        }
    }

    function submitGuess() {
        document.getElementById('submitGuessBtn').disabled = true; // Disable the button after submission
        const pegs = document.querySelectorAll('.row')[currentRow].querySelectorAll('.peg:not(.pegSlot)');
        const guess = Array.from(pegs).map(peg => peg.classList[1]);
        const feedback = compareGuessToSecret(guess, secretCode);
        displayFeedback(feedback, currentRow);

        if (feedback.black === 5) {
            alert('Congratulations! You cracked the code!');
            resetGame();
        } else if (currentRow === 7) {
            alert('Game over! The correct code was ' + secretCode.join(', ') + '.');
            resetGame();
        } else {
            currentRow++;
            setupNextRow(currentRow);
        }
    }

    function displayFeedback(feedback, rowIndex) {
        const feedbackContainer = document.createElement('div');
        feedbackContainer.classList.add('feedbackContainer');
        // Logic to display black and white feedback pegs
    }

    function resetGame() {
        currentRow = 0;
        setupGame(); // Re-initialize the game setup
    }

    function setupNextRow(rowIndex) {
        // Logic to enable the next row for guessing
    }

    // Bind the submitGuess function to the submit button
    document.getElementById('submitGuessBtn').addEventListener('click', submitGuess);

    // Helper functions
    function generateSecretCode() {
        // Your logic to generate a secret code
    }

    function compareGuessToSecret(guess, secretCode) {
        // Your logic to compare guess against the secret code and return feedback
    }
});