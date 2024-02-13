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
    let selectedColor = ''; // Tracks the currently selected color
    let currentRow = 0;

    // Set up the game
    function setupGame() {
        const colorSelection = document.getElementById('colorSelection');
        colors.forEach(color => {
            const peg = document.createElement('div');
            peg.classList.add('peg', color);
            peg.addEventListener('click', () => selectColor(color));
            colorSelection.appendChild(peg);
        });

        for (let i = 0; i < 8; i++) { // 8 rows for 8 guesses
            const row = document.createElement('div');
            row.classList.add('row');
            for (let j = 0; j < 5; j++) { // 5 pegs per row
                const pegSlot = document.createElement('div');
                pegSlot.classList.add('peg', 'pegSlot'); // 'pegSlot' for blank slots
                if (i === 0) { // Make only the first row slots clickable
                    pegSlot.addEventListener('click', () => placePeg(pegSlot, i));
                }
                row.appendChild(pegSlot);
            }
            document.getElementById('gameBoard').appendChild(row);
        }
    }

    function selectColor(color) {
        selectedColor = color; // Set the selected color
    }

    function placePeg(pegSlot, rowIndex) {
        if (selectedColor && rowIndex === currentRow) {
            pegSlot.classList.replace('pegSlot', selectedColor); // Replace 'pegSlot' with the selected color class
            checkRowCompletion();
        }
    }

    function checkRowCompletion() {
        const currentRowPegs = document.querySelectorAll('.row')[currentRow].querySelectorAll('.peg:not(.pegSlot)');
        if (currentRowPegs.length === 5) { // All 5 pegs in the row are filled
            submitGuess(Array.from(currentRowPegs).map(peg => peg.classList[1])); // Submit the guess
        }
    }

    function submitGuess(guess) {
        // Compare guess with the secret code and provide feedback
        // Assume secretCode and checkGuess function are defined
        const feedback = checkGuess(guess);
        displayFeedback(feedback);
        if (feedback.black === 5) {
            alert('Congratulations! You cracked the code!');
            resetGame();
        } else if (currentRow === 7) {
            alert('Game over! Try again!');
            resetGame();
        } else {
            unlockNextRow();
        }
    }

    function unlockNextRow() {
        currentRow++; // Move to the next row
        const nextRowPegs = document.querySelectorAll('.row')[currentRow].querySelectorAll('.pegSlot');
        nextRowPegs.forEach(peg => peg.addEventListener('click', () => placePeg(peg, currentRow)));
    }

    function displayFeedback(feedback) {
        // Display feedback logic
    }

    function resetGame() {
        // Reset game logic
    }

    setupGame(); // Initialize the game
});