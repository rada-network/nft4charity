const dotenv = require("dotenv");
const cron = require("node-cron");
const axios = require("axios").default;
const mongoose = require("mongoose");

const campaignSchema = require("./campaign.js");
const Campaign = mongoose.model("campaign", campaignSchema);

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
const cronCheckInterval = process.env.CRON_CHECK_INTERVAL_IN_MINUTES;

cron.schedule(`*/${cronCheckInterval} * * * *`, async () => {
  console.warn(`Cron job every ${cronCheckInterval} minutes`);
  try {
    const wallets = await getWallets();
    const walletAddress = wallets.map((w) => w.address);
    let dict = wallets.reduce((a, x) => ({ ...a, [x.address]: x._id }), {});
    if (walletAddress.length > 0) {
      const resp = await fetchAllAddresses(walletAddress);
      if (resp.length > 0) {
        resp.map((item) => {
          if (isValid(item)) {
            const walletId = dict[item.result[0].to];
            let allTransactions = [];
            item.result.map((r) => {
              allTransactions.push(mapToDoc(walletId, r));
            });
            saveToMDB(allTransactions);
          }
        });
      }
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

function mapToDoc(walletId, r) {
  return {
    sourceAddress: r.from,
    walletId: walletId,
    description: "Donate for campaign name",
    currency: "ETH",
    timeStamp: r.timeStamp,
    amount: r.value / WEI_TO_ETH_RATE,
    status: r.txreceipt_status,
    networkFee: r.gasPrice / WEI_TO_ETH_RATE,
    transactionId: r.hash,
  };
}

async function saveToMDB(docs) {
  console.log("saveToMDB");
  try {
    await Transaction.bulkWrite(
      docs.map((d) => {
        return {
          updateOne: {
            filter: { transactionId: d.transactionId },
            update: { $set: d },
            upsert: true,
          },
        };
      }),
      { ordered: false }
    );

    return Promise.resolve(true);
  } catch (error) {
    console.error("Failed to save to MDB ", error);
  }
}

function fetchAllAddresses(addresses) {
  return Promise.all(addresses.map(fetchTransactionsByAddress));
}

async function fetchTransactionsByAddress(walletAddress) {
  const API_URL = getUrl(walletAddress);
  return axios
    .get(API_URL)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function getWallets() {
  const campaigns = await Campaign.find({
    endedAt: {
      $gte: new Date(),
    },
  });
  if (campaigns.length > 0) {
    const campaignIds = campaigns.map((d) => d._id);
    return await Wallet.find({ campaignId: { $in: campaignIds } });
  }

  return null;
}

function getUrl(walletAddress) {
  return `${ETHER_SCAN_API_BASE_URL}/api/?module=account&action=txlist&address=${walletAddress}&&startblock=0&endblock=99999999&sort=asc&apikey=${ETHER_SCAN_API_KEY}`;
}

function isValid(item) {
  return item.status == "1" && item.result.length > 0;
}

console.warn("start cronjob");
