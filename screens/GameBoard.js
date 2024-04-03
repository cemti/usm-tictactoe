import { View, Button, Text } from 'react-native';
import { useContext, useEffect } from 'react';
import Board from '../components/Board';
import { calculateWinner } from '../components/GameLogic';
import { GameContext } from '../components/GameContextProvider';
import IconButton from '../components/IconButton';

export default function GameBoard({ navigation }) {
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
    
    useEffect(() => 
        navigation.setOptions({
            title: `Tic-Tac-Toe: ${winnerText}`,
            headerRight: () => (
                <IconButton
                    icon='list'
                    onPress={navigateToMoves}
                />
            )
        })
    , [navigation, handlePlay]);
    
    function navigateToMoves() {
        navigation.navigate('Moves');
    }
    
    return (
        <>
            <Button title='Rematch' onPress={() => setCurrentMove(0)} />
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} winnerInfo={winnerInfo} />
        </>
    );
}