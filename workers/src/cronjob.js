const dotenv = require("dotenv");
const cron = require("node-cron");

const mongoose = require("mongoose");
const walletSchema = require("./wallet.js");
const Wallet = mongoose.model("wallet", walletSchema);
const transactionSchema = require("./transaction.js");
const Transaction = mongoose.model("transaction", transactionSchema);

const uuid = require("uuid").v4;

dotenv.config();
const MONGODB_URL = process.env.MONGODB_URL;

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
    Wallet.findById("6151be392b65bbc7754c77b6", async function (err, foundDocs) {
      if (foundDocs != null) {
        console.log(foundDocs);
      } else {
        console.log("no found docs");
      }
    });
  } catch (error) {
    console.error("Failed to save to MDB ", error);
  }
}
async function getWallets() {
  // get all public wallet adress from campaigns where campaign status is still active
}

async function saveToDb(data) {
  console.log(data);
  console.warn(`[CRONJOB] Starting to save into MDB`);
}

console.warn("start cronjob");
