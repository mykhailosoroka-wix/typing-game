const settingsLocation = "data/settings.json";
const wordsLocation = "data/wordlist.json";
let settings = getSettings("medium")
let currentWord = getWord();

let timer = new Timer(
    document.getElementById('timer'),
    settings.startTime,
    settings.timeAdded,
    onFinish
);
let wordEntry = new WordEntry(
    document.getElementById('typer-container'),
    document.getElementById('target-word'),
    document.getElementById('input-word'),
    currentWord,
    onCorrect
);
let gameOver = new GameOver(
    document.getElementById('game-over-div'),
    document.getElementById('game-over-score'),
);
let score = new Score(
    document.getElementById('score'),
)

let correct = 0;

let restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', () => {
    document.querySelector("#game-container").hidden = false;
    document.querySelector("#game-over-div").hidden = true;

    settings = getSettings("medium")
    currentWord = getWord();

    timer = new Timer(
        document.getElementById('timer'),
        settings.startTime,
        settings.timeAdded,
        onFinish
    );
    wordEntry = new WordEntry(
        document.getElementById('typer-container'),
        document.getElementById('target-word'),
        document.getElementById('input-word'),
        currentWord,
        onCorrect
    );
    gameOver = new GameOver(
        document.getElementById('game-over-div'),
        document.getElementById('game-over-score'),
    );
    score = new Score(
        document.getElementById('score'),
    )

    correct = 0;
})

function loadText(path) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", path, false);
    xhr.send();
    return xhr.responseText;
}

function getSettings(difficulty) {
    const settingsContent = JSON.parse(loadText(settingsLocation));
    const difficultySettings = settingsContent.difficulty_settings.find((item) => item.difficulty === difficulty);

    return {
        startTime: settingsContent.start_time,
        timeAdded: difficultySettings.time_added
    };
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getWord(idx=-1) {
    const words = JSON.parse(loadText(wordsLocation));
    if (idx === -1) {
        idx = getRandomInt(0, words.length);
    }
    return words[idx]
}

const difficultyDropdown = document.getElementById('difficulty');
difficultyDropdown.addEventListener('change', (event) => {
    onDifficultyChange(event.target.value);
})

function onCorrect() {
    timer.increment();
    correct += 1;
    score.update(correct);
    return getWord();
}

function onFinish() {
    wordEntry.finish();
    // timer.finish()
    gameOver.finish(correct)
    document.querySelector("#game-container").hidden = true;
    // const newEl = document.querySelector("#game-over-div")
}

function onDifficultyChange(difficulty) {
    settings = getSettings(difficulty);
    timer.updateIncremental(settings.timeAdded)
}

// const container = document.getElementById('game-container');
//
// container.appendChild(timer.element);
// container.appendChild(wordEntry.element);
