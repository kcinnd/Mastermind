document.addEventListener('DOMContentLoaded', function() {
    // Toggle instructions functionality
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
    const secretCode = generateSecretCode(); // Assume this function generates the secret code

    setupGame();

    function setupGame() {
        setupColorSelection();
        setupGameBoard();
    }

    function setupColorSelection() {
        const colorSelection = document.getElementById('colorSelection');
        colorSelection.innerHTML = ''; // Clear previous color selections if any
        colors.forEach(color => {
            const peg = document.createElement('div');
            peg.classList.add('peg', color);
            peg.addEventListener('click', () => selectColor(color));
            colorSelection.appendChild(peg);
        });
    }

    function setupGameBoard() {
        const gameBoard = document.getElementById('gameBoard');
        gameBoard.innerHTML = ''; // Clear the game board for a new setup
        for (let i = 0; i < 8; i++) {
            const row = document.createElement('div');
            row.classList.add('row');
            for (let j = 0; j < 5; j++) {
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
            submitGuess();
        }
    }

    function submitGuess() {
        const pegs = document.querySelectorAll('.row')[currentRow].querySelectorAll('.peg:not(.pegSlot)');
        const guess = Array.from(pegs).map(peg => peg.classList[1]);
        const feedback = compareGuessToSecret(guess, secretCode);
        displayFeedback(feedback);

        if (feedback.black === 5) {
            alert('Congratulations! You cracked the code!');
            resetGame();
        } else if (currentRow === 7) {
            alert('Game over! Try again!');
            resetGame();
        } else {
            currentRow++;
            setupNextRow();
        }
    }

    function displayFeedback(feedback) {
        // Display feedback next to the row
    }

    function resetGame() {
        currentRow = 0;
        setupGame();
    }

    function setupNextRow() {
        // Make the next row of pegs clickable
    }

    // Helper functions like generateSecretCode, compareGuessToSecret, etc.
});

function generateSecretCode() {
    // Implementation for generating the secret code
    return colors.sort(() => 0.5 - Math.random()).slice(0, 5); // Example: Randomly select 5 colors
}

function compareGuessToSecret(guess, secretCode) {
    // Implementation for comparing the guess to the secret code and returning feedback
    let black = 0; // Correct color in the correct position
    let white = 0; // Correct color but in the wrong position
    // Your comparison logic here
    return { black, white }; // Example feedback
}