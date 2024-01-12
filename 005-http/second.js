import http from 'http';
import { weatherstackExampleAPI } from './config.js';

const weatherstackAPI = process.env.weatherstackAPI || weatherstackExampleAPI;
const city = process.argv[2];
const url = `http://api.weatherstack.com/current?access_key=${weatherstackAPI}&query=${city}`;

http.get(url, (res) => {
  const {statusCode} = res;
  if (statusCode !== 200) {
    console.log(`statusCode: ${statusCode}`);
    return;
  }

  res.setEncoding('utf8');
  let rowData = '';
  res.on('data', (chunk) => rowData += chunk);
  res.on('end', () => {
    let parseData = JSON.parse(rowData);
    console.log(parseData);
  });
}).on('error', (err) => {
  console.error(err);
});
