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
        const isHidden = instructionsDiv.style.display === 'none';
        instructionsDiv.style.display = isHidden ? 'block' : 'none';
        this.textContent = isHidden ? 'Hide Instructions' : 'Show Instructions';
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
        gameBoard.innerHTML = '';
        for (let i = 0; i < 8; i++) {
            const row = document.createElement('div');
            row.className = 'row';
            for (let j = 0; j < 5; j++) {
                const pegSlot = document.createElement('div');
                pegSlot.className = 'peg pegSlot';
                if (i === currentRow) {
                    pegSlot.addEventListener('click', function() {
                        if (selectedColor) {
                            this.className = `peg ${selectedColor}`;
                            checkRowCompletion(row);
                        }
                    });
                }
                row.appendChild(pegSlot);
            }
            gameBoard.appendChild(row);
        }
    }

    function selectColor(color) {
        selectedColor = color;
    }

    function checkRowCompletion(row) {
        submitGuessBtn.disabled = ![...row.children].every(peg => !peg.classList.contains('pegSlot'));
    }

    submitGuessBtn.addEventListener('click', function() {
        const row = document.querySelectorAll('.row')[currentRow];
        const guess = [...row.children].map(peg => peg.classList[1]);
        const feedback = compareGuessToSecret(guess, secretCode);
        displayFeedback(feedback, row);

        if (feedback.black === 5) {
            setTimeout(() => alert('Congratulations! You cracked the code!'), 100);
            resetGame();
        } else if (currentRow === 7) {
            setTimeout(() => alert('Game over! Try again.'), 100);
            resetGame();
        } else {
            currentRow++;
            if (currentRow < 8) {
                makeRowInteractive(document.querySelectorAll('.row')[currentRow]);
            }
        }
    });

    function displayFeedback(feedback, row) {
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

    function makeRowInteractive(row) {
        row.querySelectorAll('.pegSlot').forEach(pegSlot => {
            pegSlot.addEventListener('click', function() {
                if (selectedColor) {
                    this.className = `peg ${selectedColor}`;
                    checkRowCompletion(row);
                }
            });
        });
    }

    function resetGame() {
        currentRow = 0;
        setupGameBoard(); // Clear and re-setup the game board
        submitGuessBtn.disabled = true; // Disable the submit button until a new guess is made
        selectedColor = ''; // Reset selected color
    }
});