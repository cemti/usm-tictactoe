import GameInfo from './components/GameInfo';
import GameBoard from './components/GameBoard';
import GameContextProvider from './components/GameContextProvider';
import './styles.css';

export default function App() {
    return (
        <GameContextProvider>
            <GameBoard />
            <GameInfo />
        </GameContextProvider>
    );
}