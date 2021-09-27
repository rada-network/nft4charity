const dotenv = require("dotenv");
const cron = require("node-cron");

const mongoose = require("mongoose");
const walletSchema = require("./wallet.js");
const Wallet = mongoose.model("message", walletSchema);
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
const cronCheckInterval = 3; //mins
cron.schedule(`*/${cronCheckInterval} * * * *`, async () => {
  console.warn(`Cron job every ${cronCheckInterval} minutes`);
  try {
    const data = "test";
    await saveToDb(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
});

async function saveToDb(data) {
  console.log(data);
  console.warn(`[CRONJOB] Starting to save into MDB`);
}

console.warn("start cronjob");
