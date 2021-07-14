module.exports = (number) => {
    return parseInt(number) > 9 ? number.toString() : `0${number.toString()}`;
}