const { getme } = require('./helpers/getme.js');
const { tokenValidation, chatIdArrValidation } = require('./helpers/validators.js');
const { sendlog } = require('./helpers/sendlog.js');

class TgLogger {
    #token;
    #chatIdArr;
    #prefix = null;
        #levels = {
        'START': true,
        'END': true,
        'INFO': true,
        'WARN': true,
        'ERROR': true,
        'DEBUG': true,
    }
    #tokenValidation = tokenValidation;
    #chatIdArrValidation = chatIdArrValidation;
    #getme = getme;
    #sendlog = sendlog;

    constructor(token, chatIdArr) {
        this.#tokenValidation(token);
        this.#chatIdArrValidation(chatIdArr);
        this.#getme(token);
    
        this.#token = token;
        this.#chatIdArr = chatIdArr;
    }

    setLevel(level, isEnabled) {
        if (typeof level !== 'string') throw new Error("Level must be string");
        if (typeof isEnabled !== 'boolean') throw new Error("isEnabled must be boolean");
        this.#levels[level] = isEnabled;
    }
    setPrefix(prefix) {
        if (typeof prefix !== 'string') throw new Error("Prefix must be string or number");
        this.#prefix = prefix;
    }
    disabled() {
        Object.keys(this.#levels).forEach(level => this.#levels[level] = false);
    }
    enable() {
        Object.keys(this.#levels).forEach(level => this.#levels[level] = true);
    }
    start(message) {
        if (this.#levels['START']) {
            const sent = `[${new Date().toUTCString()}]\nSTART ${this.#prefix !== null ? this.#prefix : ""}\n${message}`;
            this.#chatIdArr.forEach(id => this.#sendlog(this.#token, id, sent));
            return;
        }
        throw new Error("'START' is disabled");
    }
    end(message) {
        if (this.#levels['END']) {
            const sent = `[${new Date().toUTCString()}]\nEND ${this.#prefix !== null ? this.#prefix : ""}\n${message}`;
            this.#chatIdArr.forEach(id => this.#sendlog(this.#token, id, sent));
            return;
        }
        throw new Error("'END' is disabled");
    }
    info(message) {
        if (this.#levels['INFO']) {
            const sent = `[${new Date().toUTCString()}]\nINFO ${this.#prefix !== null ? this.#prefix : ""}\n${message}`;
            this.#chatIdArr.forEach(id => this.#sendlog(this.#token, id, sent));
            return;
        }
        throw new Error("'INFO' is disabled");
    }
    warn(message) {
        if (this.#levels['WARN']) {
            const sent = `[${new Date().toUTCString()}]\nWARN ${this.#prefix !== null ? this.#prefix : ""}\n${message}`;
            this.#chatIdArr.forEach(id => this.#sendlog(this.#token, id, sent));
            return;
        }
        throw new Error("'WARN' is disabled");
    }
    error(message) {
        if (this.#levels['ERROR']) {
            const sent = `[${new Date().toUTCString()}]\nERROR ${this.#prefix !== null ? this.#prefix : ""}\n${message}`;
            this.#chatIdArr.forEach(id => this.#sendlog(this.#token, id, sent));
            return;
        }
        throw new Error("'ERROR' is disabled");
    }
    debug(message) {
        if (this.#levels['DEBUG']) {
            const sent = `[${new Date().toUTCString()}]\nDEBUG ${this.#prefix !== null ? this.#prefix : ""}\n${message}`;
            this.#chatIdArr.forEach(id => this.#sendlog(this.#token, id, sent));
            return;
        }
        throw new Error("'DEBUG' is disabled");
    }
}

module.exports = TgLogger;