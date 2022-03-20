const fs = require('fs');

function readJsonfile() {
    let rawdata = fs.readFileSync('data.json');
    let ipfs = JSON.parse(rawdata);
    console.log(ipfs);
}

async function main() {
    readJsonfile();
    
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
});