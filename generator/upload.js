/* eslint-disable no-console */
/* eslint-disable no-plusplus */
const Moralis = require('moralis/node');
const { default: axios } = require('axios');
const fs = require('fs');

// Moralis creds
const APP_ID = 'EqMciv05uKZejFIe69kPAY8q98VWWOzp7qIp6HiN';
const SERVER_URL = 'https://ejunyxphix4o.usemoralis.com:2053/server';
const MASTER_KEY = 'NTflX6v0ZqZcHChFhw0I42xZtBYS0HQJxYtyz9CI'; // DO NOT DISPLAY IN PUBLIC DIR
const X_API_KEY = 'ufPDeE4lso9WeZ4fS0desF4ikvCHRahaRnEYEVOGbEEi2RyBOywS89nzB5X4sY9F'; // DO NOT DISPLAY IN PUBLIC DIR
const BASE_URL = 'https://ipfs.moralis.io:2053';
const API_BASE_URL = 'https://deep-index.moralis.io/api/v2/ipfs/uploadFolder';

Moralis.start({ serverUrl: SERVER_URL, appId: APP_ID, masterKey: MASTER_KEY });

const ipfsArray = [];
const promises = [];
const OUTPUT_DIR = './outputs/characters';
const METADATA_DIR = './outputs/characters/jsons';

const uploadMetadata = async (cid) => {
  console.log('Running uploadMetadata......');
  console.log('----------------------------------------------------------------');
  let ipfsArr = [];
  let promiseArr = [];
  fs.readdir(METADATA_DIR, (readDirErr, files) => {
    const totalFiles = files.length;
    for (let i = 1; i < totalFiles; i++) {
      promiseArr.push(
        new Promise((resp, rej) => {
          const filePath = `${METADATA_DIR}/${i}.json`;
          fs.readFile(filePath, (err, data) => {
            if (err) rej();
            const metadata = JSON.parse(data);
            metadata.image = `${BASE_URL}/ipfs/${cid}/images/${i}.png`;
            metadata.date = new Date();
            const buff = Buffer.from(JSON.stringify(metadata));
            ipfsArr.push({
              path: `metadata/${i}.json`,
              content: buff.toString('base64'),
            });
            resp();
          });
        }),
      );
    }
    Promise.all(promiseArr).then(() => {
      axios
        .post(API_BASE_URL, ipfsArr, {
          headers: {
            'X-API-Key': X_API_KEY,
            'content-type': 'application/json',
            accept: 'application/json',
          },
        })
        .then((res) => {
          console.log(res);
          const cid1 = res.data[0].path.split('/')[4];
          console.log(cid1);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
};

function main() {
  console.log('Running main......');
  console.log('----------------------------------------------------------------');
  let ipfsArr = [];
  let promiseArr = [];
  fs.readdir(OUTPUT_DIR, (err1, files) => {
    const totalFiles = files.length;
    console.log(totalFiles);
    for (let i = 1; i < totalFiles; i++) {
      promiseArr.push(
        new Promise((resp, rej) => {
          const filePath = `${OUTPUT_DIR}/${i}.png`;
          fs.readFile(filePath, (err, data) => {
            if (err) rej();
            ipfsArr.push({
              path: `images/${i}.png`,
              content: data.toString('base64'),
            });
            resp();
          });
        }),
      );
    }
    Promise.all(promiseArr).then(() => {
      console.log(`length of ${ipfsArr.length}`);
      axios
        .post(API_BASE_URL, ipfsArr, {
          headers: {
            'X-API-Key': X_API_KEY,
            'content-type': 'application/json',
            accept: 'application/json',
          },
        })
        .then((res) => {
          console.log('IMAGE FILE PATHS:', res.data);
          const imageCid = res.data[0].path.split('/')[4];
          console.log('IMAGE CID:', imageCid);
          uploadMetadata(imageCid);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
}

main();
