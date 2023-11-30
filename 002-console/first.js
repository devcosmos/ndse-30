#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { addYears, addMonths, addDays } = require('date-fns');

const argv = yargs(hideBin(process.argv))
  .command('current', 'get current date')  
  .command('add', 'get future date')  
  .command('sub', 'get last date')  
  .option('year', {
    alias: 'y',
    type: 'string',
  })
  .option('month', {
    alias: 'm',
    type: 'string',
  })
  .option('day', {
    alias: 'd',
    type: 'string',
  })
  .argv;

const {_: command, y, m, d} = argv;

let currDate = new Date();

if (command.includes('current')) {
  switch (true) {
    case typeof y !== 'undefined':
      console.log(currDate.getFullYear());
      break;

    case typeof m !== 'undefined':
      console.log(currDate.getMonth() + 1);
      break;

    case typeof d !== 'undefined':
      console.log(currDate.getDate());
      break;
      
    default:
      console.log(currDate);
      break;
  }
}

if (command.includes('add') || command.includes('sub')) {
  const sign = command.includes('sub') ? '-' : '';

  if (y) currDate = addYears(currDate, sign + y);
  if (m) currDate = addMonths(currDate, sign + m);
  if (d) currDate = addDays(currDate, sign + d);

  console.log(currDate);
}