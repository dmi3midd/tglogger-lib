function tokenValidation(token) {
    if (typeof token !== 'string') throw new Error("Token must be string");
}

function chatIdArrValidation(arr) {
    if (!Array.isArray(arr)) throw new Error("Argument must be an array");
    if (arr.length === 0) throw new Error("Array must have at least one element");
    arr.forEach(id => {
        if (typeof id !== 'number') throw new Error("Id must be a number");
    });
}

module.exports = {
    tokenValidation,
    chatIdArrValidation,
}