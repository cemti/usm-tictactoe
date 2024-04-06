import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import GameInfo from './screens/GameInfo';
import GameBoard from './screens/GameBoard';
import GameContextProvider from './components/GameContextProvider';
import './css/styles.css';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <>
            <StatusBar style='light' />
            <GameContextProvider>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen
                            name='Tic-Tac-Toe'
                            component={GameBoard}
                        />
                        <Stack.Screen
                            name='Moves'
                            component={GameInfo}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </GameContextProvider>
        </>
    );
}