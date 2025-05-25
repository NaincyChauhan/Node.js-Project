// const path = require('path');
// const db = require(path.resolve(__dirname, './models'));

// console.log('Loaded models:', Object.keys(db));

function test( value, l=[]){
    l.push(value);
    return l;
}

console.log(test(1));
console.log(test(2));
console.log(test(3));