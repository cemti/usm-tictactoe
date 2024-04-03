import { useContext } from 'react';
import Board from './Board';
import { calculateWinner } from './GameLogic';
import { GameContext } from './GameContextProvider';

export default function GameBoard() {
    const { historyState, moveState, xIsNext, currentSquares } = useContext(GameContext);
  
    const [history, setHistory] = historyState;
    const [currentMove, setCurrentMove] = moveState;
  
    const winnerInfo = calculateWinner(currentSquares);
  
    const winnerText = winnerInfo ?
        winnerInfo.isDraw ? 'Draw' : 'Winner: ' + winnerInfo.winner
        : 'Next player: ' + (xIsNext ? 'X' : 'O');

    function handlePlay(nextSquares, index) {
        const nextHistory = [...history.slice(0, currentMove + 1), [nextSquares, index]];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }
    
    return (
        <div className='game-board'>
            <div className='status'>{winnerText}</div>
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} winnerInfo={winnerInfo} />
        </div>
    );
}