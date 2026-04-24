class Timer {
    #time
    #displayEl
    #incremental
    #timer

    constructor(element, initialTime, incremental, onFinish) {
        this.#time = initialTime;
        this.#incremental = incremental;
        this.#timer =  setInterval(() => {
            this.#time -= 1;
            this.#render();

            if (this.#time === 0) {
                onFinish();
                clearInterval(this.#timer);
            }

        }, 1000)
        this.#displayEl = element;
        // this.#displayEl.classList.add('counter');
        this.#render();
    }

    get element() {
        return this.#displayEl;
    }

    #render() {
        this.#displayEl.textContent = "Time left: " + this.#time + "s";
    }

    updateIncremental(newIncremental) {
        this.#incremental = newIncremental;
    }

    increment() {
        this.#time += this.#incremental;
        this.#render();
    }
}