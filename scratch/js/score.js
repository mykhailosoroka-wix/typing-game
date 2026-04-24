class Score {
    #element

    constructor(element) {
        this.#element = element;
        this.#element.textContent = "Score: " + 0;
    }

    update(score) {
        this.#element.textContent = "Score: " + score;
    }
}