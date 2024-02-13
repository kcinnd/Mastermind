document.addEventListener('DOMContentLoaded', function() {
    // Collapsible instructions setup
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
    let currentGuess = [];
    let currentRow = 0;

    function setupGame() {
        const colorSelection = document.getElementById('colorSelection');
        colors.forEach(color => {
            const peg = document.createElement('div');
            peg.classList.add('peg', color);
            peg.onclick = () => selectColor(color); // Select color when clicked
            colorSelection.appendChild(peg);
        });

        for (let i = 0; i < 8; i++) {
            const row = document.createElement('div');
            row.classList.add('row');
            for (let j = 0; j < 5; j++) {
                const pegSlot = document.createElement('div');
                pegSlot.classList.add('peg', 'pegSlot');
                if (i === 0) { // Only the first row is active initially
                    pegSlot.addEventListener('click', function() { placePeg(this); });
                }
                row.appendChild(pegSlot);
            }
            document.getElementById('gameBoard').appendChild(row);
        }
    }

    function selectColor(color) {
        selectedColor = color; // Update the selected color when a color peg is clicked
    }

    function placePeg(pegSlot) {
        if (selectedColor && pegSlot.parentNode === document.querySelectorAll('.row')[currentRow]) {
            pegSlot.className = `peg ${selectedColor}`; // Fill the clicked peg slot with the selected color
            pegSlot.removeEventListener('click', function() { placePeg(this); }); // Optional: Make peg unclickable after color is placed
            updateCurrentGuess();
        }
    }

    function updateCurrentGuess() {
        const currentRowPegs = document.querySelectorAll('.row')[currentRow].querySelectorAll('.peg');
        currentGuess = Array.from(currentRowPegs).map(peg => peg.classList.contains('pegSlot') ? null : peg.classList[1]);
    }

    function submitGuess() {
        // Guess submission and feedback logic remains the same
        // Add a call to unlockNextRow() where appropriate
    }

    function unlockNextRow() {
        currentRow++;
        const nextRowPegs = document.querySelectorAll('.row')[currentRow].querySelectorAll('.peg');
        nextRowPegs.forEach(peg => {
            peg.addEventListener('click', function() { placePeg(this); });
        });
    }

    function checkGuess(guess) {
        // Guess checking logic remains the same
    }

    function displayFeedback(feedback) {
        // Feedback display logic remains the same
    }

    function resetGame() {
        // Reset logic remains the same
        // Ensure all rows except the first are "locked" again
    }

    setupGame(); // Initialize the game
});