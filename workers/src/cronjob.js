const dotenv = require("dotenv");
const cron = require("node-cron");
const axios = require("axios").default;

const mongoose = require("mongoose");
const walletSchema = require("./wallet.js");
const Wallet = mongoose.model("wallet", walletSchema);
const transactionSchema = require("./transaction.js");
const Transaction = mongoose.model("transaction", transactionSchema);

dotenv.config();
const MONGODB_URL = process.env.MONGODB_URL;
const ETHER_SCAN_API_BASE_URL = process.env.ETHER_SCAN_API_BASE_URL;
const ETHER_SCAN_API_KEY = process.env.ETHER_SCAN_API_KEY;
const WEI_TO_ETH_RATE = 1000000000000000000;

const mdbOptions = {
  autoIndex: false, // Don't build indexes
  poolSize: 2,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

mongoose.connect(MONGODB_URL, mdbOptions);

// Run job every ? mins
const cronCheckInterval = 1; //mins
cron.schedule(`*/${cronCheckInterval} * * * *`, async () => {
  console.warn(`Cron job every ${cronCheckInterval} minutes`);
  try {
    const wallets = await findAndUpdate();
    //await saveToDb(wallets);
  } catch (error) {
    console.error(error);
    throw error;
  }
});

async function findAndUpdate() {
  try {
    const walletId = "6151be392b65bbc7754c77b6";
    Wallet.findById(walletId, async function (err, foundDocs) {
      if (foundDocs != null) {
        const walletAddress = foundDocs.address;
        const API_URL = getUrl(walletAddress);
        getAllTransactions(API_URL).then((resp) => {
          if (resp.data.status == "1") {
            const result = resp.data.result;
            result.map((r) => {
              if (r.hash) {
                const doc = {
                  transaction: r.hash,
                  sourceAddress: r.from,
                  walletId: walletId,
                  description: "Donate for campaign name",
                  currency: "ETH",
                  timeStamp: r.timeStamp,
                  amount: r.value / WEI_TO_ETH_RATE,
                  status: r.txreceipt_status,
                  networkFee: r.gasPrice / WEI_TO_ETH_RATE,
                  transactionId: r.hash
                };
                Transaction.insertMany(doc)
                  .then((savedResp) => {
                    console.warn("Success to save to MDB ", savedResp);
                  })
                  .catch((error) => {
                    console.error("Failed to save to MDB ", error);
                    throw error;
                  });
              }
            });
          }
        });
      } else {
        console.log("no found docs");
      }
    });
  } catch (error) {
    console.error("Failed to save to MDB ", error);
  }
}

async function getAllTransactions(url) {
  return axios
    .get(url)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function getWallets() {
  // get all public wallet adress from campaigns where campaign status is still active
}

async function saveToDb(data) {
  console.log(data);
  console.warn(`[CRONJOB] Starting to save into MDB`);
}

function getUrl(walletAddress) {
  return `${ETHER_SCAN_API_BASE_URL}/api/?module=account&action=txlist&address=${walletAddress}&&startblock=0&endblock=99999999&sort=asc&apikey=${ETHER_SCAN_API_KEY}`;
}

console.warn("start cronjob");
