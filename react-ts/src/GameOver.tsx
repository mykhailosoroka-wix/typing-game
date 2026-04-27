import {GameState} from './GameState';

const GameOver = ({state, resetGame}: {state: GameState, resetGame: () => void}) => {

    if (state.isActive) {
        return (
            <div className="game-over-div" hidden>
            </div>
        )
    }

    return (
        <div className="game-over-div">
            <p>Time ran out</p>
            <p className="game-over-score">Total Score: { state.score }</p>
            <button className="restart-button" onClick={() => resetGame()}>Restart</button>
        </div>
    )
}

export default GameOver;