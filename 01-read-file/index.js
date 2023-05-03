const fs = require('fs');
const path = require('path');
const { stdout } = process;

const filePath = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(filePath);

readStream.on('data', (text) => stdout.write(text));