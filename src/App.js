import logo from './logo.svg';
import './App.css';
import { solve, randomize } from './logic.js';
import { useState, useEffect } from 'react';

function App(props) {
  const [pieces, setPieces] = useState([1, 2, 3, 4, 5, 6, 7, 8, -1]);

  const solveBoard = () => {
    let steps = solve([...pieces]);
    for (let i = 0; i < steps.length; i++) {
        setTimeout(() => {
            setPieces(steps[i]);
        }, 200 * i);
    }
  };

  const randomizeBoard = () => {
      setPieces(randomize([...pieces]));
  };

  return (
    <div className="App">
      <h1 className="Title">Puzzle Solver</h1>
      <Board pieces={pieces} size={3}/>
      <button className="SolveButton" onClick={solveBoard}>Solve</button>
      <button className="RandomizeButton" onClick={randomizeBoard}>Randomize</button>
    </div>
  );
}

function Piece(props) {
    let className = "Piece";
    if (props.number === -1) {
        className += " Empty";
    }
    return (
        <div className={className}>
            <h1> {props.number} </h1>
        </div>
    );
}

function Board(props) {
    let react_pieces = props.pieces.map((number) => {
        return <Piece key={number} number={number}/>
    });
    return (
        <div className="Board">
            {react_pieces}
        </div>
    );
}


export default App;

