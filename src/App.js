import React, { useState } from 'react';
import './App.css';

// Create an initial empty board with 9 null squares
const initialBoard = Array(9).fill(null);

function App() {
  // State to manage the game board, current player, and winner
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(board);

  // Handle a square click event
  const handleClick = (index) => {
    // If there is a winner or the square is already filled, return
    if (winner || board[index]) return;

    // Create a copy of the current board
    const newBoard = [...board];
    // Set the clicked square to 'X' or 'O' based on the current player
    newBoard[index] = xIsNext ? 'X' : 'O';

    // Update the board and toggle the current player
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  // Render a square button
  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  // Determine the game status (e.g., winner, draw, or next player)
  const getStatus = () => {
    if (winner) {
      return `Winner: ${winner}`;
    } else if (board.every((square) => square)) {
      return 'It\'s a draw!';
    } else {
      return `Next player: ${xIsNext ? 'X' : 'O'}`;
    }
  };

  const restartBoard = () => {
    setXIsNext(true)
    return setBoard(initialBoard)
  }

  return (
    <div className="game">
      <div className="game-board">
        {/* Render the 3x3 grid of squares */}
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="game-info">
        {/* Display game status */}
        <div className="status">{getStatus()}</div>
        <button onClick={restartBoard}>Re-start game</button>
      </div>
    </div>
  );
}

// Function to calculate the winner based on the current board
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Return the winner ('X' or 'O')
    }
  }

  return null; // If there's no winner, return null
}

export default App;
