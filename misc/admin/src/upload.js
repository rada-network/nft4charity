const { NFTStorage, File } = require('nft.storage')
const fs = require('fs');
const path = require('path');
const dotenv = require("dotenv");

const ASSET_FOLDER = './assets/';
const ARTIST_NAME = "Thành Nguyễn";
const FILE_DESCRIPTION = 'Rada Bull for NFT Charity project';

dotenv.config();
const client = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY })

uploadFiles();

function uploadFiles() {
    fs.readdir(ASSET_FOLDER, async(err, files) => {
        let uploadedFiles = await Promise.all(files.map(async (file, idx) => {
            const filePath = `${ASSET_FOLDER}/${file}`;
            const data = await fs.promises.readFile(filePath);
            const metadata = buildMetadata(data, idx, file);
            const result = await client.store(metadata);
            return result;
        }))
        writeToJsonFile(uploadedFiles);
    });
}

function buildMetadata(data, idx, file) {
    const ext = path.extname(file).split('.')[1];
    const imageType = `image/${ext}`;
    return {
        name: `Rada Bull ` + idx,
        description: `${FILE_DESCRIPTION}`,
        artist: ARTIST_NAME,
        image: new File([data], file, { type: imageType })
    }
}

function writeToJsonFile(data) {
    const jsonData = JSON.stringify(data);
    fs.writeFileSync('data.json', jsonData);
}