import React, { useState } from 'react';
import './TicTacToe.css'; // Import your CSS file for styling

const TicTacToe = () => {
  const [matrix, setMatrix] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ]);
  const [currentUser, setCurrentUser] = useState('X');
  const [isWinnerFound, setIsWinnerFound] = useState(false);
  const [winningLine, setWinningLine] = useState([]);


  // to find winner of the game 
  const findWinner = (mat, user) => {

      for (let i = 0; i < 3; i++) {
        // horizontal check
        if (mat[i][0] === user && mat[i][0] === mat[i][1] && mat[i][1] === mat[i][2]) {
          setWinningLine([`${i}0`, `${i}1`, `${i}2`]);
          return user;
        }
        //vertical check
        if (mat[0][i] === user && mat[0][i] === mat[1][i] && mat[1][i] === mat[2][i]) {
          setWinningLine([`0${i}`, `1${i}`, `2${i}`]);
          return user;
        }
        // Diagonal check
        if ((mat[0][0] === user && mat[0][0] === mat[1][1] && mat[1][1] === mat[2][2])) {
          setWinningLine([`00`, `11`, `22`]);
          return user;
        }
        // Anti diagonal check
        if ((mat[0][2] === user && mat[0][2] === mat[1][1] && mat[1][1] === mat[2][0])) {
          setWinningLine([`02`, `11`, `20`]);
          return user;
        }
    }
    return null;

    
  };

  // When a box is clicked to enter either X or O
  const handleCellClick = (row, col) => {
    if (matrix[row][col] === "" && !isWinnerFound) {
      let matrixCopy = [...matrix];
      matrixCopy[row][col] = currentUser;
      setMatrix(matrixCopy);
      setCurrentUser(currentUser === 'X' ? 'O' : 'X');

      const winner = findWinner(matrixCopy, currentUser);
      if (winner) {
        setIsWinnerFound(true);
      }
    }
  };

  // To again play the game
  const resetGame = () => {
    setMatrix([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ]);
    setCurrentUser('X');
    setIsWinnerFound(false);
    setWinningLine([]);
  };

  return (
    <div className="tic-tac-toe">
      <h2>Tic Tac Toe</h2>
      <p>Current Turn: Player {currentUser}</p>
      <table>
        <tbody>
          {/* iterate through the matrix */}
          {matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {/* through each cell */}
              {row.map((cell, colIndex) => {
                const cellId = `${rowIndex}${colIndex}`;
                let classes = "cell";
                if (winningLine.includes(cellId)) {
                  classes += " winning-cell";
                }
                return (
                  <td key={colIndex} onClick={() => handleCellClick(rowIndex, colIndex)} className={classes}>
                    {cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {isWinnerFound && (
        <div className="winner-message">
          <p>Player {currentUser === 'X' ? 'O' : 'X'} wins!</p>
          <button onClick={resetGame}>Reset Game</button>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
