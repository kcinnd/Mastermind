document.addEventListener('DOMContentLoaded', function() {
    // Collapsible instructions
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

    // Game setup and logic
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'cyan', 'magenta', 'lime', 'pink'];
    const secretCode = ['red', 'blue', 'green', 'yellow', 'purple']; // Fixed secret code
    let currentGuess = [];
    let currentRow = 0;

    function setupGame() {
        const colorSelection = document.getElementById('colorSelection');
        colors.forEach(color => {
            const peg = document.createElement('div');
            peg.classList.add('peg', color);
            peg.onclick = () => selectColor(color);
            colorSelection.appendChild(peg);
        });

        for (let i = 0; i < 8; i++) { // 8 rows for 8 guesses
            const row = document.createElement('div');
            row.classList.add('row');
            for (let j = 0; j < 5; j++) { // 5 pegs per guess
                const pegSlot = document.createElement('div');
                pegSlot.classList.add('peg');
                row.appendChild(pegSlot);
            }
            document.getElementById('gameBoard').appendChild(row);
        }
    }

    function selectColor(color) {
        if (currentGuess.length < 5) {
            currentGuess.push(color);
            updateCurrentRow();
        }
    }

    function updateCurrentRow() {
        const rows = document.querySelectorAll('.row');
        const pegs = rows[currentRow].querySelectorAll('.peg');
        currentGuess.forEach((color, index) => {
            pegs[index].className = `peg ${color}`; // Ensures existing classes are replaced
        });
    }

    function submitGuess() {
        if (currentGuess.length === 5) {
            const feedback = checkGuess(currentGuess);
            displayFeedback(feedback);
            if (feedback.black === 5) {
                alert('Congratulations! You cracked the code!');
                resetGame();
            } else if (currentRow === 7) {
                alert('Game over! Try again!');
                resetGame();
            } else {
                currentRow++;
                currentGuess = [];
            }
        }
    }

    function checkGuess(guess) {
        let black = 0; // Correct color and position
        let white = 0; // Correct color, wrong position
        let codeCopy = [...secretCode];
        let guessCopy = [...guess];

        // First pass for black pegs
        guess.forEach((peg, index) => {
            if (peg === secretCode[index]) {
                black++;
                codeCopy[index] = guessCopy[index] = null;
            }
        });

        // Second pass for white pegs
        guessCopy.forEach((peg, index) => {
            if (peg && codeCopy.includes(peg)) {
                white++;
                codeCopy[codeCopy.indexOf(peg)] = null;
            }
        });

        return { black, white };
    }

    function displayFeedback(feedback) {
        const feedbackArea = document.createElement('div');
        feedbackArea.classList.add('feedbackArea');

        for (let i = 0; i < feedback.black; i++) {
            const blackPeg = document.createElement('div');
            blackPeg.classList.add('feedbackPeg', 'black');
            feedbackArea.appendChild(blackPeg);
        }

        for (let i = 0; i < feedback.white; i++) {
            const whitePeg = document.createElement('div');
            whitePeg.classList.add('feedbackPeg', 'white');
            feedbackArea.appendChild(whitePeg);
        }

        const rows = document.querySelectorAll('.row');
        rows[currentRow].appendChild(feedbackArea);
    }

    function resetGame() {
        currentGuess = [];
        currentRow = 0;
        document.querySelectorAll('.row').forEach(row => {
            row.innerHTML = ''; // Clear the row
            for (let i = 0; i < 5; i++) { // Re-add empty peg slots
                const pegSlot = document.createElement('div');
                pegSlot.classList.add('peg');
                row.appendChild(pegSlot);
            }
        });
    }

    setupGame(); // Initialize the game
});