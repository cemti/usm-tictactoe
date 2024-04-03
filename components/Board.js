import Square from './Square';
import { View } from 'react-native';
import { calculateWinner } from './GameLogic';

export default function Board({ xIsNext, squares, onPlay, winnerInfo }) {
    function handleClick(i) {
        if (!winnerInfo && !squares[i]) {
            const nextSquares = [...squares];
            nextSquares[i] = xIsNext ? 'X' : 'O';
            onPlay(nextSquares, i);
        }
    }
  
    return (
       <div className='game-board'>
            {
                [...Array(9).keys().map(n => (
                    <Square key={n} value={squares[n]} onSquareClick={() => handleClick(n)} isWinner={winnerInfo?.line?.includes(n)} />
                ))]
            }
        </div>
    );
}