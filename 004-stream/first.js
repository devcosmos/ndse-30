#!/usr/bin/env node
const readline = require('node:readline');
const fs = require('fs');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({
  input,
  output,
  prompt: '',
});

const secretNumber = Math.ceil(Math.random() * 2);

console.log(`Сыграем в игру - Орёл (1) или решка(2)? Введи значение:`);

rl.prompt();

rl.on('line', (inputNumber) => {
  const number = Number(inputNumber);

  if (number === 1 || number === 2) {
    const isWin = secretNumber === number;
    fs.appendFile(
      `${process.argv[2]}.txt`,
      isWin ? 'win\n' : 'lose\n',
      (err) => {
        if (err) throw Error(err);
        console.log(`Вы ${isWin ? 'победили' : 'проиграли'}`);
        rl.close();
      }
    );
  } else {
    console.log('Невалидное значение, попробуй снова');
  }
});
