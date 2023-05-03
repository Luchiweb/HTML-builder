const fs = require('fs');
const path = require('path');
const readline = require('readline');

const { stdin, stdout } = process;

const filePath = path.join(__dirname, 'output.txt');
const writeStream = fs.createWriteStream(filePath);
const rl = readline.createInterface({ input: stdin, output: stdout });

fs.writeFile(filePath, '', (err) => {
  if (err) throw err;
});

stdout.write('Hi! Let\'s write some text in our new file\n');

rl.on('line', (text) => {
  if (text === 'exit') endProcess();
  else {
    fs.appendFile(filePath, `${text}\n`, (err) => {
      if (err) throw err;
    });
  }
});

process.on('beforeExit', () => endProcess());

function endProcess() {
  writeStream.end();
  stdout.write('By! Nice to meet you)\n');
  process.exit();
}
