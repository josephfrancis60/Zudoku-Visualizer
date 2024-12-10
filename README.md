# Zudoku-Visualizer
Python-based Sudoku Solver that uses **Recursive Backtracking** to solve any valid sudoku puzzle with real-time visualization.

## Description
This project includes an interactive Sudoku solver that accepts user input, validates the board, and dynamically visualizes the solving process. The solver is implemented using **Flask** for the backend and **vanilla JavaScript**, **HTML**, and **CSS** for the frontend. REST APIs are utilized for seamless communication between the client and server.

### Key Features
- Dynamic 9x9 sudoku grid for user input.
- *Dynamic Visualization*: Step-by-step real-time visualization of the recursive backtracking algorithm.
- *Validation*: Ensures the input Sudoku board is valid before solving.
- RESTfull API integration for solving the puzzle and providing visualization steps.

## Tech Stack
### Backend Technology
**Python** with **Flask**: Manages the server-side logic, including:

- *Validation Logic*: Ensures the input grid is valid 9x9 sudoku board.
- *Recursive Backtracking*: Implements the core solving logic and tracks steps for visualization.
- *REST API*: Facilitates communication between the backend and frontend. The **/solve** endpoint processes the solution with detailed steps.

### Frontend Technology
**HTML, CSS, JavaScript**: Implements an interactive and user-friendly interface, featuring:

- Dynamic Sudoku grid creation.
- Real-time updates for forward and backtracking steps.
- Buttons to solve or reset the puzzle.

### Integration: *Flask Framework*
The frontend sends the inputted board data to the *"/solve"* endpoint using a *POST* request. The backend processes the data, solves the puzzle, and returns the solution and steps as **JSON**.

## REST API Usage
- **Endpoint**: /solve
- **Method**: POST
- **Request Body**: JSON object containing the Sudoku board:
    ```
    {
        "board": [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            ...
        ]
    }
    ```
- **Response**: JSON object with status message, solved board and the visualization steps.

## How It Works
1. **User Input**: Users fill the 9x9 grid via the web interface.
2. **Solve Request**: The grid is sent to the backend using a REST API.
3. **Backend Processing**: The Python backend validates the input, applies the recursive backtracking algorithm, and tracks the solving steps.
4. **Visualization**: The frontend dynamically updates the grid, showing each step in the solving  process, including backtracking, untill the puzzle is solved.

## Backtracking in Action
<img src="https://github.com/user-attachments/assets/880fe445-81a3-4755-a1f7-e25756182f66" width="400" height="auto" />

## Setup
1. Clone the Repository:
    ```
    git clone https://github.com/josephfrancis60/Zudoku-Visualizer.git
    ```
    or click `Download zip` and extract it.
2. Navigate to  Project Directory:
    ```
    cd <project_directory>
    ```
3. (Optional) Setup a virtual environment.
4. Install Dependencies:
    ```
    pip install -r requirements.txt
    ```
5. Run Flask app:
    ```
   python app.py
   ```
   The application will start and you can access it in  your browser at: `http://127.0.0.1:5000`

## License
The Author is not responsible for any misuse of the program. See the [MIT LICENSE](./LICENSE). 