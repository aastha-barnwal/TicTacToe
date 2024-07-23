// src/App.js

import React from 'react';
import './App.css';
import TicTacToe from './components/TicTacToe';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tic Tac Toe Game</h1>
      </header>
      <main>
        <TicTacToe />
      </main>
    </div>
  );
}

export default App;
