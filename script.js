document.addEventListener('DOMContentLoaded', function() {
    // Toggle game instructions visibility
    document.getElementById('toggleInstructions').addEventListener('click', function() {
        const instructions = document.getElementById('gameInstructions');
        instructions.style.display = instructions.style.display === 'none' ? 'block' : 'none';
        this.textContent = instructions.style.display === 'block' ? 'Hide Instructions' : 'Show Instructions';
    });

    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'cyan', 'magenta', 'lime', 'pink'];
    let selectedColor = '';
    let currentRow = 0;
    const secretCode = generateSecretCode();

    setupGame();

    function setupGame() {
        setupColorSelection();
        setupGameBoard();
        document.getElementById('submitGuessBtn').addEventListener('click', submitGuess);
    }

    function setupColorSelection() {
        const colorSelection = document.getElementById('colorSelection');
        colorSelection.innerHTML = ''; // Clear previous selections
        colors.forEach(color => {
            const peg = document.createElement('div');
            peg.classList.add('peg', color);
            peg.addEventListener('click', () => selectColor(color));
            colorSelection.appendChild(peg);
        });
    }

    function setupGameBoard() {
        const gameBoard = document.getElementById('gameBoard');
        gameBoard.innerHTML = ''; // Clear the game board
        for (let i = 0; i < 8; i++) {
            const row = document.createElement('div');
            row.classList.add('row');
            for (let j = 0; j < 5; j++) {
                const pegSlot = document.createElement('div');
                pegSlot.classList.add('peg', 'pegSlot');
                pegSlot.addEventListener('click', function() {
                    if (selectedColor && this.classList.contains('pegSlot')) {
                        this.classList.remove('pegSlot');
                        this.classList.add(selectedColor);
                        checkRowCompletion();
                    }
                });
                row.appendChild(pegSlot);
            }
            gameBoard.appendChild(row);
        }
        // Initially disable the submit button
        document.getElementById('submitGuessBtn').disabled = true;
    }

    function selectColor(color) {
        selectedColor = color;
    }

    function checkRowCompletion() {
        const pegs = document.querySelectorAll('.row')[currentRow].querySelectorAll('.peg:not(.pegSlot)');
        // Enable submit button if all pegs in the row are filled
        document.getElementById('submitGuessBtn').disabled = pegs.length !== 5;
    }

    function submitGuess() {
        const pegs = document.querySelectorAll('.row')[currentRow].querySelectorAll('.peg:not(.pegSlot)');
        const guess = Array.from(pegs, peg => peg.classList[1]); // Extract color classes
        const feedback = compareGuessToSecret(guess, secretCode);
        displayFeedback(feedback, currentRow);

        if (feedback.black === 5) {
            alert('Congratulations! You cracked the code!');
            resetGame();
        } else if (currentRow === 7) {
            alert('Game over! Try again.');
            resetGame();
        } else {
            currentRow++;
            document.getElementById('submitGuessBtn').disabled = true; // Disable submit button for the next row
        }
    }

    function displayFeedback(feedback, rowIndex) {
        const row = document.querySelectorAll('.row')[rowIndex];
        const feedbackContainer = document.createElement('div');
        feedbackContainer.classList.add('feedbackContainer');

        for (let i = 0; i < feedback.black; i++) {
            const blackPeg = document.createElement('div');
            blackPeg.classList.add('feedbackPeg', 'black');
            feedbackContainer.appendChild(blackPeg);
        }

        for (let i = 0; i < feedback.white; i++) {
            const whitePeg = document.createElement('div');
            whitePeg.classList.add('feedbackPeg', 'white');
            feedbackContainer.appendChild(whitePeg);
        }

        row.appendChild(feedbackContainer);
    }

    function generateSecretCode() {
        // Generate a random secret code consisting of 5 colors
        let code = [];
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * colors.length);
            code.push(colors[randomIndex]);
        }
        return code;
    }

    function compareGuessToSecret(guess, secret) {
        // Compare guess to the secret code and return feedback
        // This should return an object with counts of correctly positioned colors ('black') and correct colors in the wrong position ('white')
        // Implement this based on your game's rules
    }

    function resetGame() {
        // Reset the game for a new round
        currentRow = 0;
        setupGame();
    }
});