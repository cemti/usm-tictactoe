import { View, Text, Button, FlatList } from 'react-native';
import { useContext, useEffect } from 'react';
import { GameContext } from '../components/GameContextProvider';
import IconButton from '../components/IconButton';

export default function GameInfo({ navigation }) {
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
            move != currentMove ? (
                <Button onPress={() => setCurrentMove(move)} title={`Go to ${description}`} />
            ) : (
                <Button disabled title={`You are at ${description}`} />
            )
        );
    });
  
    if (currentToggle) {
        moves.reverse();
    }
    
    useEffect(() => 
        navigation.setOptions({
            headerRight: () => (
                <IconButton
                    icon='swap-vertical-outline'
                    onPress={toggleOrdering}
                />
            )
        })
    , [navigation, toggleOrdering]);
    
    return (
        <FlatList data={moves} renderItem={({ item }) => item} />
    );
}
