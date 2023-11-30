#!/usr/bin/env node
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({
  input,
  output,
  prompt: '',
});

const maxNumber = 100;
const secretNumber = Math.floor(Math.random() * maxNumber);

console.log(`Загадано число в диапазоне от 0 до ${maxNumber}`);

rl.prompt();

rl.on('line', (inputNumber) => {
  switch (true) {
    case inputNumber == secretNumber:
      console.log(`Отгадано число ${secretNumber}`);
      process.exit(0);
    case inputNumber > secretNumber:
      console.log('Меньше');
      break;
    case inputNumber < secretNumber:
      console.log('Больше');
      break;
  }
  rl.prompt();
});
