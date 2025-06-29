class LogQueue {
    #queue = [];
    #processing = false;

    constructor(sendlogfunc) {
        this.sendlogfunc = sendlogfunc;
    }

    add(task) {
        this.#queue.push(task);
        this.#process();
    }

    async #process() {
        if (this.#processing) return;
        this.#processing = true;

        while (this.#queue.length > 0) {
            const task = this.#queue.shift();
            try {
                await this.sendlogfunc(task);
            } catch (err) {
                throw new Error(err.message);
            }
        }

        this.#processing = false;
    }
}

module.exports = {
    LogQueue
}