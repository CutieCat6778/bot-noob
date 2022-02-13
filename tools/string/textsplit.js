const stringTools = new (require('string-toolkit'))(); // require the module

module.exports = (string) => {
    try {
        let array = stringTools.toChunks(string, 5); // splitting in every 5 words
        const output = array.slice(0, 360).join(''); // combine to 1900 words
        return output; // return output
    } catch (e) {
        require('../functions/error')(e)
    }
}