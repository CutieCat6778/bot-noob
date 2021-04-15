const {readFileSync, writeFileSync} = require('fs');

module.exports = async () => {
    let file = await readFileSync('./asset/unconverter.txt', 'utf-8');
    file = file.split('\n');
    const arr = []
    file.forEach(a => {
        if(a.toString() == "\r"){
            file.splice(file.indexOf(a), 1);
        }
        if(isNaN(a[0]) == true){
            return arr.push(a);
        }else if(isNaN(a[0]) == false && (a.slice(0, 2)) == false){
            const b = a.slice(3)
            b == "" ? null : arr.push(b);
        }else if(isNaN(a[0]) == false && isNaN(a.slice(0, 2)) == true){
            const b = a.slice(2)
            b == "" ? null : arr.push(b);
        }
    })
    await writeFileSync('./asset/convertered.json', JSON.stringify(arr));
}