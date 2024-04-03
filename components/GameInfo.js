import { useContext } from 'react';
import { GameContext } from './GameContextProvider';

export default function GameInfo() {
    const { historyState, moveState, toggleState } = useContext(GameContext);
    
    const [history, setHistory] = historyState;
    const [currentMove, setCurrentMove] = moveState;
    const [currentToggle, setToggle] = toggleState;
    
    function toggleOrdering() {
        setToggle(!currentToggle);
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
                        <button onClick={() => setCurrentMove(move)}>Go to {description}</button>
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
        <div className='game-info'>
            <button onClick={toggleOrdering}>Toggle ordering</button>
            <ol>{moves}</ol>
        </div>
    );
}
