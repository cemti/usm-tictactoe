import { useState } from 'react';
import './styles.css';

function Square({ value, onSquareClick, isWinner }) {
  return (
    <button data-is-winner={isWinner} className='square' onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    
    const nextSquares = [...squares];
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares, i);
  }

  const winnerInfo = calculateWinner(squares);
  
  const status = winnerInfo ?
      winnerInfo.isDraw ? 'Draw' : 'Winner: ' + winnerInfo.winner
      : 'Next player: ' + (xIsNext ? 'X' : 'O');

  return (
    <>
        <div className='status'>{status}</div>
        {
            [...Array(3).keys().map(row => (
                <div key={row} className='board-row'>
                    {
                        [...Array(3).keys().map(col => {
                            const n = row * 3 + col;
                            return (
                            <Square key={n} value={squares[n]} onSquareClick={() => handleClick(n)} isWinner={winnerInfo?.line?.includes(n)} />
                            )
                        })]
                    }
                </div>
            ))]
        }
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([[Array(9).fill(null)]]);
  const [currentMove, setCurrentMove] = useState(0);
  const [currentToggle, setToggle] = useState(false);
  
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove][0];

  function handlePlay(nextSquares, index) {
    const nextHistory = [...history.slice(0, currentMove + 1), [nextSquares, index]];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }
  
  function toggleOrdering() {
    setToggle(currentToggle ^ true);
  }

  const moves = history.map((squares, move) => {
    let description;
    
    if (move > 0) {
      let i = Math.trunc(squares[1] / 3), j = squares[1] % 3;
      description = `move #${move} @ (${i + 1}, ${j + 1})`;
    } else {
      description = 'game start';
    }
    
    return (
        <li key={move}>
            {
                move != currentMove ? (
                    <button onClick={() => jumpTo(move)}>Go to {description}</button>
                ) : (
                    <>You are at {description}</>
                )
            }
        </li>
    );
  });
  
  if (currentToggle) {
      moves.reverse();
  }

  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <button onClick={toggleOrdering}>Toggle ordering</button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

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
  
  let isFilled = true;
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    
    isFilled &= !!(squares[a] && squares[b] && squares[c]);
    
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
            line: lines[i],
            winner: squares[a],
            isDraw: false
        };
    }
  }
  
  return isFilled ? {
      line: null,
      winner: null,
      isDraw: true
  } : null;
}
