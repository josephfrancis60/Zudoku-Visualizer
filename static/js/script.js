// Global flag to control visualization
let abortVisualization = false;

// Function to create a 9x9 Sudoku grid
function createSudokuGrid() {
    const container = document.querySelector("#sudoku-container"); // Select the container using querySelector
    const table = document.createElement("table"); // Create a table element

    for (let i = 0; i < 9; i++) {
        const row = document.createElement("tr"); // Create a row for the table
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement("td"); // Create a table cell
            const input = document.createElement("input"); // Create an input element for each cell
            input.type = "number";
            input.min = 1;
            input.max = 9;

            // Adding event listener to detect user-input cell
            input.addEventListener("input", () => {
                if (input.value) {
                    input.classList.add("user-input");
                } else {
                    input.classList.remove("user-input"); // Removes the class if input is cleared
                }
            });
            input.className = "sudoku-cell"; // Adding a class to cell for styling
            cell.appendChild(input); // Append the input element to the cell
            row.appendChild(cell); // Append the cell to the row
        }
        table.appendChild(row); // Append the row to the table
    }
    container.appendChild(table); // Append the table to the container
}

// Call the function to create the grid on page load
createSudokuGrid();

// Function to get the board from the grid
function getBoard() {
    const board = [];
    const rows = document.querySelectorAll("table tr");
    rows.forEach(row => {
        const cells = row.querySelectorAll("input");
        const rowArray = [];
        cells.forEach(cell => {
            rowArray.push(Number(cell.value) || 0);  // Empty cells are 0
        });
        board.push(rowArray);
    });
    return board;
}

// Function to set the board values in the grid
function setBoard(board) {
    const rows = document.querySelectorAll("table tr");
    rows.forEach((row, i) => {
        const cells = row.querySelectorAll("input");
        cells.forEach((cell, j) => {
            cell.value = board[i][j] || "";  // Empty cells should remain empty
        });
    });
}

// Function to visualize the backtracking algorithm
async function visualizeSteps(steps) {
    abortVisualization = false; // Reset the abort flag

    for (const step of steps) {
        if (abortVisualization) {
            return; // Stop visualization if abort flag is set
        }

        const [row, col, value] = step;
        const rows = document.querySelectorAll("table tr");
        const cell = rows[row].querySelectorAll("input")[col];

        // Update the cell value
        cell.value = value || "";  // Empty cells should be cleared

        // Apply different styles for forward and backtracking steps
        if (value === 0) {
            cell.classList.add("backtrack-cell");
        } else {
            cell.classList.add("solved-cell");
        }

        // Wait for a short duration before proceeding to the next step
        await new Promise(resolve => setTimeout(resolve, 80));   // speed of visualisation in ms

        // Remove the temporary styles
        if (!abortVisualization) {
            cell.classList.remove("solved-cell", "backtrack-cell");
        }
    }
}


// Function to solve sudoku with visualization
async function solveSudoku() {
    abortVisualization = false; // Ensure visualization runs
    const board = getBoard();

    const response = await fetch("/solve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ board }),
    });

    const result = await response.json();

    if (result.status === "success") {
        const { steps } = result;

        // Visualize the solving process
        await visualizeSteps(steps);

        // Display the final solved board
        if (!abortVisualization) {
            setBoard(result.board);
        }
    } else {
        alert(result.message);  // Display error message from Python validation
    }
}

// Reset Grid Function
function resetGrid() {
    abortVisualization = true; // Abort any ongoing visualization
    document.querySelectorAll("input").forEach(input => {
        input.value = "";
        input.classList.remove("user-input", "solved-cell", "backtrack-cell");
    });
    
}

// Add event listeners to the buttons
document.getElementById("solve-button").addEventListener("click", solveSudoku);
document.getElementById("clear-button").addEventListener("click", resetGrid);
