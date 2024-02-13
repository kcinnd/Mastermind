/* Basic page styling */
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    margin: 0;
}

h1 {
    color: #333;
}

/* Instructions toggle button */
#toggleInstructions {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 20px;
}

#toggleInstructions:hover {
    background-color: #0056b3;
}

/* Instructions content */
#gameInstructions {
    display: none; /* Initially hidden */
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    width: 80%;
    max-width: 600px;
    margin-bottom: 20px;
}

/* Color selection area */
#colorSelection {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
}

/* Game board */
#gameBoard {
    display: grid;
    grid-template-columns: repeat(5, 50px); /* 5 columns for the pegs */
    grid-auto-rows: 50px; /* Auto row height */
    gap: 10px;
    margin-bottom: 20px;
}

/* Pegs and peg slots */
.peg, .pegSlot {
    width: 50px; /* Adjust size for visibility */
    height: 50px;
    border-radius: 50%;
    border: 2px solid #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
}

.pegSlot {
    background-color: #e0e0e0; /* Light grey for empty slots */
}

/* Specific colors for pegs */
.red { background-color: red; }
.blue { background-color: blue; }
.green { background-color: green; }
.yellow { background-color: yellow; }
.purple { background-color: purple; }
.orange { background-color: orange; }
.cyan { background-color: cyan; }
.magenta { background-color: magenta; }
.lime { background-color: lime; }
.pink { background-color: pink; }

/* Feedback pegs */
.feedbackContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px; /* Space between the guess row and feedback pegs */
}

.feedbackPeg {
    width: 15px; /* Size of feedback pegs */
    height: 15px;
    border-radius: 50%; /* Make pegs circular */
    margin: 1px;
}

.black { background-color: black; }
.white { background-color: white; }

/* Submit guess button */
#submitGuessBtn {
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px; /* Space above the button */
}

#submitGuessBtn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}