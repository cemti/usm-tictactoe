import Square from './Square';
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
        <div>
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
        </div>
    );
}