const { LogQueue } =require('./helpers/LogQueue.js');
const { getme } = require('./helpers/getme.js');
const { chatIdArrValidation } = require('./helpers/validators.js');
const { sendlog } = require('./helpers/sendlog.js');

class TgLogger {
    #token;
    #chatIdArr;
    #isQueue;
    #prefix = null;
        #levels = {
        'START': true,
        'END': true,
        'INFO': true,
        'WARN': true,
        'ERROR': true,
        'DEBUG': true,
    }
    #logQueues = {};
    #isChain = false;
    #chatIdArrValidation = chatIdArrValidation;
    #getme = getme;
    #sendlog = sendlog;
    #initQueue(chatIdArr) {
        for (const id of chatIdArr) {
            this.#logQueues[id] = new LogQueue((data) => this.#sendlog(this.#token, id, data));
        }
    }

    constructor(token, chatIdArr, isQueue = false) {
        this.#getme(token);
        this.#chatIdArrValidation(chatIdArr);
        if (isQueue) this.#initQueue(chatIdArr);
        this.#token = token;
        this.#chatIdArr = chatIdArr;
        this.#isQueue = isQueue;
    }

    setLevel(level, isEnabled) {
        if (typeof level !== 'string') throw new Error("Level must be a string");
        if (typeof isEnabled !== 'boolean') throw new Error("isEnabled must be boolean");
        this.#levels[level.trim().toUpperCase()] = isEnabled;
    }
    setPrefix(prefix) {
        if (typeof prefix !== 'string' && prefix !== null) throw new Error("Prefix must be a string or null");
        this.#prefix = prefix;
    }
    disabled() {
        Object.keys(this.#levels).forEach(level => this.#levels[level] = false);
    }
    enable() {
        Object.keys(this.#levels).forEach(level => this.#levels[level] = true);
    }
    chain() {
        if (!this.#isChain) {
            this.#isChain = true;
            this.#initQueue(this.#chatIdArr);
            return;
        }
        throw new Error("The chain is already open");
    }
    close() {
        if (this.#isChain) {
            this.#isChain = false;
            return;
        }
        throw new Error("The chain is already closed");
    }
    async start(message) {
        if (this.#levels['START']) {
            const msg = `[${new Date().toUTCString()}]\nSTART ${this.#prefix !== null ? this.#prefix : ""}\n${message}`;
            if (this.#isChain || this.#isQueue) {
                for (const id of this.#chatIdArr) {
                    this.#logQueues[id].add(msg);
                }
                return;
            }
            this.#chatIdArr.forEach(async id => await this.#sendlog(this.#token, id, msg));
            return;
        }
        throw new Error("'START' is disabled");
    }
    async end(message) {
        if (this.#levels['END']) {
            const msg = `[${new Date().toUTCString()}]\nEND ${this.#prefix !== null ? this.#prefix : ""}\n${message}`;
            if (this.#isChain || this.#isQueue) {
                for (const id of this.#chatIdArr) {
                    this.#logQueues[id].add(msg);
                }
                return;
            }
            this.#chatIdArr.forEach(async id => await this.#sendlog(this.#token, id, msg));
            return;
        }
        throw new Error("'END' is disabled");
    }
    async info(message) {
        if (this.#levels['INFO']) {
            const msg = `[${new Date().toUTCString()}]\nINFO ${this.#prefix !== null ? this.#prefix : ""}\n${message}`;
            if (this.#isChain || this.#isQueue) {
                for (const id of this.#chatIdArr) {
                    this.#logQueues[id].add(msg);
                }
                return;
            }
            this.#chatIdArr.forEach(async id => await this.#sendlog(this.#token, id, msg));
            return;
        }
        throw new Error("'INFO' is disabled");
    }
    async warn(message) {
        if (this.#levels['WARN']) {
            const msg = `[${new Date().toUTCString()}]\nWARN ${this.#prefix !== null ? this.#prefix : ""}\n${message}`;
            if (this.#isChain || this.#isQueue) {
                for (const id of this.#chatIdArr) {
                    this.#logQueues[id].add(msg);
                }
                return;
            }
            this.#chatIdArr.forEach(async id => await this.#sendlog(this.#token, id, msg));
            return;
        }
        throw new Error("'WARN' is disabled");
    }
    async error(message) {
        if (this.#levels['ERROR']) {
            const msg = `[${new Date().toUTCString()}]\nERROR ${this.#prefix !== null ? this.#prefix : ""}\n${message}`;
            if (this.#isChain || this.#isQueue) {
                for (const id of this.#chatIdArr) {
                    this.#logQueues[id].add(msg);
                }
                return;
            }
            this.#chatIdArr.forEach(async id => await this.#sendlog(this.#token, id, msg));
            return;
        }
        throw new Error("'ERROR' is disabled");
    }
    async debug(message) {
        if (this.#levels['DEBUG']) {
            const msg = `[${new Date().toUTCString()}]\nDEBUG ${this.#prefix !== null ? this.#prefix : ""}\n${message}`;
            if (this.#isChain || this.#isQueue) {
                for (const id of this.#chatIdArr) {
                    this.#logQueues[id].add(msg);
                }
                return;
            }
            this.#chatIdArr.forEach(async id => await this.#sendlog(this.#token, id, msg));
            return;
        }
        throw new Error("'DEBUG' is disabled");
    }
}

module.exports = TgLogger;