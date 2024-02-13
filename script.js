document.addEventListener('DOMContentLoaded', function() {
    // Toggle instructions functionality
    document.getElementById('toggleInstructions').addEventListener('click', function() {
        const instructions = document.getElementById('gameInstructions');
        instructions.style.display = instructions.style.display === 'none' ? 'block' : 'none';
        this.textContent = instructions.style.display === 'block' ? 'Hide Instructions' : 'Show Instructions';
    });

    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'cyan', 'magenta', 'lime', 'pink'];
    let selectedColor = '';
    let currentRow = 0;
    const secretCode = generateSecretCode(); // Implement this function based on your game's rules

    setupGame();

    function setupGame() {
        setupColorSelection();
        setupGameBoard();
        document.getElementById('submitGuessBtn').addEventListener('click', submitGuess);
        document.getElementById('submitGuessBtn').disabled = true; // Initially disable the submit button
    }

    function setupColorSelection() {
        const colorSelection = document.getElementById('colorSelection');
        colorSelection.innerHTML = '';
        colors.forEach(color => {
            const peg = document.createElement('div');
            peg.classList.add('peg', color);
            peg.addEventListener('click', () => selectColor(color));
            colorSelection.appendChild(peg);
        });
    }

    function setupGameBoard() {
        const gameBoard = document.getElementById('gameBoard');
        gameBoard.innerHTML = '';
        for (let i = 0; i < 8; i++) {
            const row = document.createElement('div');
            row.classList.add('row');
            for (let j = 0; j < 5; j++) {
                const pegSlot = document.createElement('div');
                pegSlot.classList.add('peg', 'pegSlot');
                if (i === 0) { // Only the first row is active initially
                    pegSlot.addEventListener('click', () => placePeg(pegSlot));
                }
                row.appendChild(pegSlot);
            }
            gameBoard.appendChild(row);
        }
    }

    function selectColor(color) {
        selectedColor = color;
    }

    function placePeg(pegSlot) {
        if (selectedColor && pegSlot.classList.contains('pegSlot')) {
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
        const pegs = document.querySelectorAll('.row')[currentRow].querySelectorAll('.peg:not(.pegSlot)');
        const guess = Array.from(pegs).map(peg => peg.classList[1]);
        const feedback = compareGuessToSecret(guess, secretCode);
        displayFeedback(feedback, currentRow);

        if (feedback.black === 5) {
            alert('Congratulations! You cracked the code!');
            resetGame();
        } else if (currentRow === 7) {
            alert('Game over! Try again!');
            resetGame();
        } else {
            setupNextRow();
        }
    }

    function displayFeedback(feedback, rowIndex) {
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

        const row = document.querySelectorAll('.row')[rowIndex];
        row.appendChild(feedbackContainer);
    }

    function resetGame() {
        currentRow = 0;
        setupGame();
    }

    function setupNextRow() {
        currentRow++;
        const nextRowPegs = document.querySelectorAll('.row')[currentRow].querySelectorAll('.pegSlot');
        nextRowPegs.forEach(peg => peg.addEventListener('click', () => placePeg(peg)));
        document.getElementById('submitGuessBtn').disabled = true; // Disable submit button for the new row until it's complete
    }

    function generateSecretCode() {
        // Your logic to generate a random secret code from the available colors
    }

    function compareGuessToSecret(guess, secretCode) {
        // Your logic to compare the guess to the secret code and return feedback
    }
});