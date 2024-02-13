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
    const secretCode = generateSecretCode();

    setupGame();

    function setupGame() {
        setupColorSelection();
        setupGameBoard();
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
                pegSlot.addEventListener('click', () => placePeg(pegSlot));
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
        displayFeedback(feedback, currentRow);

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
        
        document.querySelectorAll('.row')[rowIndex].appendChild(feedbackContainer);
    }

    function resetGame() {
        currentRow = 0;
        setupGame();
    }

    function setupNextRow() {
        // Make the next row of pegs clickable
        const nextRow = document.querySelectorAll('.row')[currentRow];
        const pegSlots = nextRow.querySelectorAll('.pegSlot');
        pegSlots.forEach(pegSlot => {
            pegSlot.addEventListener('click', () => placePeg(pegSlot));
        });
    }

    function generateSecretCode() {
        // Randomly pick 5 colors as the secret code; ensure no duplicates if that's part of your game rules
    }

    function compareGuessToSecret(guess, secretCode) {
        let black = 0; // Correct color in the correct position
        let white = 0; // Correct color but in the wrong position
        // Your comparison logic here
        return { black, white };
    }
});