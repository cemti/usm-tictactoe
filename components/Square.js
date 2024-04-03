export default function Square({ value, onSquareClick, isWinner }) {
    return (
        <button data-is-winner={isWinner} className='square' onClick={onSquareClick}>
            {value}
        </button>
    );
}