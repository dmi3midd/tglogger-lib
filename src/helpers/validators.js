function chatIdArrValidation(arr) {
    if (!Array.isArray(arr)) throw new Error("The argument must be an array");
    if (arr.length === 0) throw new Error("The array must have at least one element");
    arr.forEach(id => {
        if (typeof id !== 'number') throw new Error("The id must be a number");
    });
}

module.exports = {
    chatIdArrValidation,
}