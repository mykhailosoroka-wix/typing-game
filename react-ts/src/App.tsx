import { useState } from 'react'
import './App.css'
import {GameState} from "./GameState.ts";
import type GameSettings from "./GameSettings.ts";
import WordEntry from "./WordEntry.tsx";
import Timer from "./Timer.tsx";
import GameOver from "./GameOver.tsx";

function App() {
  const settingsLocation = "data/settings.json";
  const wordsLocation = "data/wordlist.json";
  let currentWord = getWord(wordsLocation);

  // const [count, setCount] = useState(0)
  const [settings, setSettings] = useState(getSettings("easy", settingsLocation));
  const [time, setTime] = useState(settings.startTime);
  const [state, setState] = useState(new GameState(currentWord, settings));
  const [resetKey, setResetKey] = useState(0);


  function onCorrect() {
    setTime(time => time + settings.timeAdded);
    setState(prev => ({ ...prev, score: prev.score + 1, currentWord: getWord(wordsLocation) }));
  }

  function resetGame() {
    setState(() => new GameState(currentWord, settings))
    setTime(settings.startTime);
    setResetKey(k => k + 1);
  }

  return (
      <>
        <div className="difficulty-bar">
          <p className="difficulty-label">Difficulty</p>
          // TODO: Remove the settings state
          <select className="difficulty" defaultValue="easy" onChange={(e) => setSettings(getSettings(e.target.value, settingsLocation))}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="game-container">
          <div className="game-name">
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

function getSettings(difficulty: string, settingsLocation: string): GameSettings {
  const settingsContent = JSON.parse(loadText(settingsLocation));
  const difficultySettings = settingsContent.difficulty_settings.find((item: { difficulty: string; }) => item.difficulty === difficulty);

  return {
    startTime: settingsContent.start_time,
    timeAdded: difficultySettings.time_added
  };
}

function loadText(path: string) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", path, false);
  xhr.send();
  return xhr.responseText;
}



function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getWord(wordsLocation: string, idx=-1) {
  const words = JSON.parse(loadText(wordsLocation));
  if (idx === -1) {
    idx = getRandomInt(0, words.length);
  }
  return words[idx]
}

export default App
