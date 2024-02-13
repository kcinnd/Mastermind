document.addEventListener('DOMContentLoaded', function() {
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
        document.getElementById('submitGuessBtn').disabled = true;
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
                row.appendChild(pegSlot);
            }
            gameBoard.appendChild(row);
        }
        makeRowInteractive(document.querySelectorAll('.row')[0]);
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
            currentRow++;
            if (currentRow < 8) {
                makeRowInteractive(document.querySelectorAll('.row')[currentRow]);
            }
            document.getElementById('submitGuessBtn').disabled = true;
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

    function makeRowInteractive(row) {
        const pegSlots = row.querySelectorAll('.pegSlot');
        pegSlots.forEach(slot => {
            slot.addEventListener('click', () => placePeg(slot));
        });
    }

    function resetGame() {
        currentRow = 0;
        setupGame();
    }

    function generateSecretCode() {
        let code = [];
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * colors.length);
            code.push(colors[randomIndex]);
        }
        return code;
    }

    function compareGuessToSecret(guess, secretCode) {
        let black = 0; // Correct color and position
        let white = 0; // Correct color but wrong position
        let secretCopy = [...secretCode];
        let guessCopy = [...guess];

        // First pass for black pegs
        for (let i = 0; i < guess.length; i++) {
            if (guess[i] === secretCopy[i]) {
                black++;
                secretCopy[i] = guessCopy[i] = null;
            }
        }

        // Second pass for white pegs
        for (let i = 0; i < guess.length; i++) {
            if (guessCopy[i] !== null && secretCopy.includes(guessCopy[i])) {
                white++;
                secretCopy[secretCopy.indexOf(guessCopy[i])] = null;
            }
        }

        return { black, white };
    }
});