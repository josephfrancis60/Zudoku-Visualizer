from flask import Flask, render_template, request, jsonify
from main import solve_sudoku_with_steps  # Import solver and validation logic

app = Flask(__name__)

@app.route("/")
def home(): # Render the Sudoku input page
    return render_template("index.html")


@app.route("/solve", methods=["POST"])
def solve():  # Solve the Sudoku puzzle and return steps for visualization
    board = request.json["board"]

    solved_board, steps = solve_sudoku_with_steps(board)

    if solved_board is None:
        return jsonify({"status": "failure", "message": "Board is invalid or unsolvable."})
    
    return jsonify({"status": "success", "board": solved_board, "steps": steps})

if __name__ == "__main__":
    app.run()