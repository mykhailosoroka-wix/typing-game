class GameOver {
    #container;
    #scoreBar;

    constructor(container, scoreBar) {
        this.#container = container;
        this.#scoreBar = scoreBar;

        this.#container.hidden = true;
    }

    finish(score) {
        this.#container.hidden = false;
        this.#scoreBar.textContent = "Total score: " + score;
    }
}