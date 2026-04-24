class WordEntry {
    #word
    #displayEl
    #targetEl
    #contents
    isActive = true;


    constructor(container, target, display, targetWord, onCorrect) {
        this.#word = targetWord;
        this.#contents = "";
        // this.#container = document.createElement("div")
        //this.#targetEl = document.createElement("p")
        this.#targetEl = target;
        this.#targetEl.textContent = targetWord;
        //this.#displayEl = document.createElement("input");
        this.#displayEl = display;
        this.#displayEl.classList.add("wordEntry");
        this.#displayEl.disabled = false;
        this.#displayEl.addEventListener('input', (e) => {
            if(this.isActive) {
                this.#contents = e.target.value;
                if(this.#contents === this.#word) {
                    this.updateWord(onCorrect);
                }
                this.#render();
            }
        })
    }

    updateWord(onCorrect) {
        this.#word = onCorrect();
        this.#contents = "";
        this.#render();
    }

    finish() {
        this.isActive = false;
        this.#contents = "";
        this.#displayEl.disabled = true;
        this.#render();
    }

    #render() {
        this.#targetEl.textContent = this.#word;
        this.#displayEl.value = this.#contents;
    }
}