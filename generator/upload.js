/* eslint-disable no-console */
/* eslint-disable no-plusplus */
const Moralis = require('moralis/node');
const request = require('request');
const { default: axios } = require('axios');
const fs = require('fs');

// Moralis creds
const APP_ID = 'EqMciv05uKZejFIe69kPAY8q98VWWOzp7qIp6HiN';
const SERVER_URL = 'https://ejunyxphix4o.usemoralis.com:2053/server';
const MASTER_KEY = 'NTflX6v0ZqZcHChFhw0I42xZtBYS0HQJxYtyz9CI'; // DO NOT DISPLAY IN PUBLIC DIR
const X_API_KEY = 'ufPDeE4lso9WeZ4fS0desF4ikvCHRahaRnEYEVOGbEEi2RyBOywS89nzB5X4sY9F'; // DO NOT DISPLAY IN PUBLIC DIR
const BASE_URL = 'https://ipfs.moralis.io:2053';

Moralis.start({ serverUrl: SERVER_URL, appId: APP_ID, masterKey: MASTER_KEY });

const ipfsArray = [];
const promises = [];
const OUTPUT_DIR = './outputs/punks';
fs.readdir(OUTPUT_DIR, (files) => {
  const totalFiles = files.length;
  console.log(totalFiles);
  for (let i = 1; i <= totalFiles; i++) {
    promises.push(
      new Promise((resp, reject) => {
        fs.readFile(`${OUTPUT_DIR}/${i}.png`, (err, data) => {
          if (err) reject();
          ipfsArray.push({
            path: `images/${i}.png`,
            content: data.toString('base64'),
          });
          resp();
        });
      }),
    );
  }
});
