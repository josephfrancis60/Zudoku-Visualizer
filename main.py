# Validate if the Sudoku board is a valid 9x9 grid with numbers 0-9
def is_valid(board):
    if len(board) != 9 or any(len(row) != 9 for row in board):
        return False
    for row in board:
        for num in row:
            if num < 0 or num > 9:
                return False
    return True

# Check if a number can be placed in the specified cell
def is_valid_insertion(board, row, col, num):
    for i in range(9):  # Check the row and column
        if board[row][i] == num or board[i][col] == num:
            return False
    # Check the 3x3 subgrid
    box_row, box_col = 3 * (row // 3), 3 * (col // 3)
    for i in range(box_row, box_row + 3):
        for j in range(box_col, box_col + 3):
            if board[i][j] == num:
                return False
    return True

# Solve the Sudoku puzzle and collect steps for visualization
def solve_sudoku_with_steps(board):
    steps = []  # List to store steps (row, col, value)

    def backtrack(board):
        for row in range(9):
            for col in range(9):
                if board[row][col] == 0:  # Find an empty cell
                    for num in range(1, 10):  # Try numbers 1-9
                        if is_valid_insertion(board, row, col, num):
                            board[row][col] = num
                            steps.append((row, col, num))  # Record the step
                            if backtrack(board):
                                return True
                            board[row][col] = 0  # Backtrack
                            steps.append((row, col, 0))  # Record backtracking step
                    return False
        return True

    if not is_valid(board):  # Validate before solving
        return None, []

    if backtrack(board):
        return board, steps  # Return the solved board and steps
    return None, []
