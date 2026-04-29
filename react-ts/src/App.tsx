import { useState } from 'react'
import './App.css'
import {GameState} from "./GameState.ts";
import  GameSettings from "./GameSettings.ts";
import WordEntry from "./WordEntry.tsx";
import Timer from "./Timer.tsx";
import GameOver from "./GameOver.tsx";
import settingsData from "./data/settings.json";
import words from "./data/wordlist.json";

function App() {
  let currentWord = getWord();

  // const [count, setCount] = useState(0)
  const initialSettings = getSettings("easy");
  const [time, setTime] = useState(initialSettings.startTime);
  const [state, setState] = useState(new GameState(currentWord, initialSettings));
  const [resetKey, setResetKey] = useState(0);


  function onCorrect() {
    setTime(time => time + state.gameSettings.timeAdded);
    setState(prev => ({ ...prev, score: prev.score + 1, currentWord: getWord() }));
  }

  function resetGame() {
    setState(() => new GameState(currentWord, initialSettings));
    setTime(state.gameSettings.startTime);
    setResetKey(k => k + 1);
  }

  return (
      <>
        <div className="difficulty-bar">
          <p className="difficulty-label">Difficulty</p>
          <select key={resetKey} className="difficulty rounded" defaultValue="easy" onChange={(e) => setState(prev => ({
            ...prev,
            gameSettings: getSettings(e.target.value)
          }))}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="game-container side-paddings screen-centered core-container rounded">
          <div className="game-name rounded">
            <p>👩‍💻 Speed Typer 👨‍💻</p>
          </div>
          <div className="line">
            <Timer
                key={resetKey}
                time={time}
                setTime={setTime}
                onFinish={() => setState(prev => ({...prev, isActive: false}))}
            />
            <p className="score">Score: {state.score}</p>
          </div>
          <WordEntry state={state} onCorrect={() => onCorrect()}></WordEntry>
        </div>

        <GameOver state={state} resetGame={resetGame}></GameOver>
      </>
  )
}

function getSettings(difficulty: string): GameSettings {
  const difficultySettings = settingsData.difficulty_settings.find(item => item.difficulty === difficulty);

  return {
    startTime: settingsData.start_time,
    timeAdded: difficultySettings!.time_added
  };
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getWord(idx = -1) {
  if (idx === -1) {
    idx = getRandomInt(0, words.length);
  }
  return words[idx];
}

export default App
