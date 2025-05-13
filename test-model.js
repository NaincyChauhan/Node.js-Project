const path = require('path');
const db = require(path.resolve(__dirname, './models'));

console.log('Loaded models:', Object.keys(db));