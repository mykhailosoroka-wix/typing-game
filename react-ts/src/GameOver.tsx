import {GameState} from './GameState';

const GameOver = ({state, resetGame}: {state: GameState, resetGame: () => void}) => {

    if (state.isActive) {
        return (
            <div className="game-over-div" hidden>
            </div>
        )
    }

    return (
        <div className="game-over-div screen-centered core-container rounded">
            <p className="title">Time ran out</p>
            <p className="game-over-score">Total Score: { state.score }</p>
            <button className="restart-button side-paddings rounded" onClick={() => resetGame()}>Restart</button>
        </div>
    )
}

export default GameOver;