
const StringTools = require("string-toolkit");
const stringTools = new StringTools;
module.exports = (string, bool) => {
    if (bool && bool == true) {
        let array = stringTools.toChunks(string, 5);
        const narary = array.slice(0, Math.floor((1800 / 5))).join('');
        let output = `\`\`\`console\n${narary} \n\`\`\``
        if (output.length > 1900) {
            narary = array.slice(0, Math.floor((output.length - (output.length - 1900)) / 5)).join('');
        }
        return output;
    }
    let array = stringTools.toChunks(JSON.stringify(string), 5);
    const narary = array.slice(0, Math.floor((1800 / 5))).join('');
    let output = `\`\`\`json\n${narary} \n\`\`\``
    if (output.length > 1900) {
        narary = array.slice(0, Math.floor((output.length - (output.length - 1900)) / 5)).join('');
    }
    return output;
}