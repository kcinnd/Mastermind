document.addEventListener('DOMContentLoaded', function() {
    const toggleInstructionsBtn = document.getElementById('toggleInstructions');
    const instructionsDiv = document.getElementById('gameInstructions');
    const gameBoard = document.getElementById('gameBoard');
    const submitGuessBtn = document.getElementById('submitGuessBtn');
    const colorSelection = document.getElementById('colorSelection');

    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'cyan', 'magenta', 'lime', 'pink'];
    let selectedColor = '';
    let currentRow = 0;

    // Fixed secret code for each game
    const secretCode = ['yellow', 'orange', 'lime', 'pink', 'red'];

    toggleInstructionsBtn.addEventListener('click', function() {
        instructionsDiv.style.display = instructionsDiv.style.display === 'none' ? 'block' : 'none';
        this.textContent = instructionsDiv.style.display === 'block' ? 'Hide Instructions' : 'Show Instructions';
    });

    setupColorSelection();
    setupGameBoard();

    function setupColorSelection() {
        colors.forEach(color => {
            const colorPeg = document.createElement('div');
            colorPeg.className = `peg ${color}`;
            colorPeg.addEventListener('click', () => selectColor(color));
            colorSelection.appendChild(colorPeg);
        });
    }

    function setupGameBoard() {
        gameBoard.innerHTML = ''; // Clear the game board
        for (let i = 0; i < 40; i++) { // Create 40 peg slots directly
            const pegSlot = document.createElement('div');
            pegSlot.className = 'peg pegSlot';
            pegSlot.addEventListener('click', function() {
                if (selectedColor && Math.floor(i / 5) === currentRow) {
                    this.className = `peg ${selectedColor}`;
                    checkRowCompletion();
                }
            });
            gameBoard.appendChild(pegSlot); // Append the peg slot directly to the game board
        }
    }

    function selectColor(color) {
        selectedColor = color;
    }

    function checkRowCompletion() {
        const startIndex = currentRow * 5;
        const endIndex = startIndex + 5;
        const rowPegs = Array.from(gameBoard.children).slice(startIndex, endIndex);
        submitGuessBtn.disabled = rowPegs.some(peg => peg.classList.contains('pegSlot'));
    }

    submitGuessBtn.addEventListener('click', function() {
        const startIndex = currentRow * 5;
        const endIndex = startIndex + 5;
        const rowPegs = Array.from(gameBoard.children).slice(startIndex, endIndex);
        const guess = rowPegs.map(peg => peg.classList[1]);
        const feedback = compareGuessToSecret(guess, secretCode);
        displayFeedback(feedback, startIndex);

        if (feedback.black === 5) {
            setTimeout(() => alert('Congratulations! You cracked the code!'), 100);
            resetGame();
        } else if (currentRow === 7) {
            setTimeout(() => alert('Game over! Try again.'), 100);
            resetGame();
        } else {
            currentRow++;
        }
    });

    function displayFeedback(feedback, startIndex) {
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
        // Insert the feedback container next to the last peg of the current row in the grid
        gameBoard.insertBefore(feedbackContainer, gameBoard.children[startIndex + 5]);
    }

    function compareGuessToSecret(guess, secret) {
        let black = 0;
        let white = 0;
        let secretCopy = [...secret];
        let guessCopy = [...guess];

        guessCopy.forEach((g, i) => {
            if (g === secretCopy[i]) {
                black++;
                secretCopy[i] = guessCopy[i] = null;
            }
        });

        guessCopy.forEach((g, i) => {
            if (g !== null && secretCopy.includes(g)) {
                white++;
                secretCopy[secretCopy.indexOf(g)] = null;
            }
        });

        return { black, white };
    }

    function resetGame() {
        currentRow = 0;
        setupGameBoard(); // Clear and re-setup the game board
        submitGuessBtn.disabled = true; // Ensure the submit button is disabled until a guess is made
        selectedColor = ''; // Reset the selected color
    }
});
