import { useState, createContext } from 'react';

export const GameContext = createContext();

export default function GameContextProvider({ children }) {
    const [history, setHistory] = useState([[Array(9).fill(null)]]);
    const [currentMove, setCurrentMove] = useState(0);
    const toggleState = useState(false);
    
    return (
        <GameContext.Provider
            value={{
                historyState: [history, setHistory],
                moveState: [currentMove, setCurrentMove],
                toggleState,
                xIsNext: currentMove % 2 === 0,
                currentSquares: history[currentMove][0]
            }}>
            {children}
        </GameContext.Provider>
    );
}