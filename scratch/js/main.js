const settingsLocation = "data/settings.json";
const wordsLocation = "data/wordlist.json";
let settings = getSettings("easy")
let currentWord = getWord();

let timer, wordEntry, gameOver, score;
({ timer, wordEntry, gameOver, score } = initComponents(timer, wordEntry, gameOver, score));
let correctCount = 0;

let restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', () => {
    document.querySelector("#game-container").hidden = false;
    document.querySelector("#game-over-div").hidden = true;
    document.querySelector("#difficulty").selectedIndex =0;

    settings = getSettings("easy")
    currentWord = getWord();

    ({ timer, wordEntry, gameOver, score } = initComponents(timer, wordEntry, gameOver, score));

    correctCount = 0;
})

const difficultyDropdown = document.getElementById('difficulty');
difficultyDropdown.addEventListener('change', (event) => {
    onDifficultyChange(event.target.value);
})

function initComponents(timer, wordEntry, gameOver, score) {
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

    return { timer, wordEntry, gameOver, score }
}

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

function onCorrect() {
    timer.increment();
    correctCount += 1;
    score.update(correctCount);
    return getWord();
}

function onFinish() {
    wordEntry.finish();
    gameOver.finish(correctCount);
    document.querySelector("#game-container").hidden = true;
}

function onDifficultyChange(difficulty) {
    settings = getSettings(difficulty);
    timer.updateIncremental(settings.timeAdded)
}
