/* eslint-disable @typescript-eslint/no-unused-vars */
import * as dotenv from "dotenv";
import {
  commerce,
  company,
  datatype,
  date,
  finance,
  image,
  lorem,
} from "faker";
import { resolve } from "path";
import { ConnectionOptions, createConnection, MongoRepository } from "typeorm";
import { Campaign, Transaction, User, Wallet } from "../entities";

const numberOfUsers = 3;
const numberOfCampaigns = 4;
const numberOfWallets = 7;
const numberOfTransactions = 15;

dotenv.config();

if (!process.env.MONGODB_STAGING_URL) {
  throw new Error("Please provide the MONGDB_SEEDING_URL to .env");
}

const config: ConnectionOptions = {
  type: "mongodb",
  url: process.env.MONGODB_STAGING_URL || "",
  entities: [resolve(__dirname, "../**/*.entity{.ts,.js}")],
  synchronize: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { hexaDecimal, boolean, number, float } = datatype;

async function generateTransactionForWallet(
  walletId: string,
  transactionRepo: MongoRepository<Transaction>,
  transactions: Transaction[],
) {
  const numberOfTransactions = datatype.number({ min: 5, max: 20 });

  console.log(
    `Saving ${numberOfTransactions} transaction(s) for wallet id ${walletId} to the database...`,
  );

  for (let i = 0; i < numberOfTransactions; i++) {
    const transaction = transactionRepo.create({
      sourceAddress: finance.ethereumAddress(),
      description: lorem.sentence(),
      currency: "ETH",
      amount: number({ min: 100, max: 1500 }) / 10000000,
      status: "1",
      networkFee: number({ min: 100, max: 1500 }) / 10000000,
      transactionId: hexaDecimal(64),
    });

    transaction.walletId = walletId;

    await transactionRepo.save(transaction);
    transactions.push(transaction);

    console.log(`Save ${i + 1} transaction(s) 👏🏻.`);
  }
}

async function generateWalletForCampaign(
  campaignId: string,
  walletRepo: MongoRepository<Wallet>,
  transactionRepo: MongoRepository<Transaction>,
  transactions: Transaction[],
  users: User[],
  wallets: Wallet[],
) {
  const numOfWallet = datatype.number({ min: 1, max: 2 });
  console.log(
    `Saving ${numOfWallet} wallet(s) of campaign id ${campaignId} to the database...`,
  );

  for (let i = 0; i < numOfWallet; i++) {
    const wallet = walletRepo.create({
      address: finance.ethereumAddress(),
      currency: "ETH",
      platform: "Binance",
      isVerified: false,
    });

    const randomIndex = number({ min: 0, max: users.length - 1 });
    wallet.userId = "615db44061c08b12f6b79cc3";

    wallet.campaignId = campaignId;

    await walletRepo.save(wallet);
    wallets.push(wallet);

    await generateTransactionForWallet(
      wallet._id.toString(),
      transactionRepo,
      transactions,
    );

    console.log(`Saved ${i + 1} wallet(s) 🗂`);
  }
}

async function seed() {
  console.log("Connecting to mongodb... 🚀");

  const connection = await createConnection(config);

  console.log("Connected ✅");

  const userRepo = connection.getMongoRepository(User);
  const campaignRepo = connection.getMongoRepository(Campaign);
  const walletRepo = connection.getMongoRepository(Wallet);
  const transactionRepo = connection.getMongoRepository(Transaction);

  const users: User[] = await userRepo.find();
  const campaigns: Campaign[] = [];
  const wallets: Wallet[] = [];
  const transactions: Transaction[] = [];

  // console.log(`Saving ${numberOfUsers} user(s) to the database...`);

  // for (let i = 0; i < numberOfUsers; i++) {
  //   const user = userRepo.create({
  //     firstName: name.findName(),
  //     lastName: name.lastName(),
  //     email: internet.email(),
  //   });

  //   await userRepo.save(user);
  //   users.push(user);

  //   console.log(`Saved ${i + 1} user(s) 👍🏻`);
  // }

  console.log(`Saving ${numberOfCampaigns} campaign(s) to the database...`);

  for (let i = 0; i < numberOfCampaigns; i++) {
    const campaign = campaignRepo.create({
      name: company.companyName(),
      description: commerce.productDescription(),
      goal: datatype.number({ min: 5000, max: 10000 }),
      startedAt: date.between("2021-10-01", "2021-11-10"),
      endedAt: date.between("2021-11-11", "2021-12-31"),
      coverImgUrl: image.nature(),
      thumbnailImgUrl: image.nature(),
    });

    const randomIndex = number({ min: 0, max: users.length - 1 });
    campaign.userId = users[randomIndex]._id.toString();

    await campaignRepo.save(campaign);
    campaigns.push(campaign);

    console.log(`Saved ${i + 1} campaign(s) 👍🏻`);
  }

  await Promise.all(
    campaigns.map(async (c) => {
      await generateWalletForCampaign(
        c._id.toString(),
        walletRepo,
        transactionRepo,
        transactions,
        users,
        wallets,
      );
      return null;
    }),
  );

  console.log(`Seeding finished. Closing connection...`);

  connection.close();

  console.log(`Connection closed! Have a good day ✨`);
}

async function clean() {
  console.log("Connecting to mongodb... 🚀");

  const connection = await createConnection(config);

  console.log("Connected ✅");

  const userRepo = connection.getMongoRepository(User);
  const campaignRepo = connection.getMongoRepository(Campaign);
  const walletRepo = connection.getMongoRepository(Wallet);
  const transactionRepo = connection.getMongoRepository(Transaction);

  await generateWalletForCampaign(
    "615db44061c08b12f6b79cc6",
    walletRepo,
    transactionRepo,
    [] as Transaction[],
    [] as User[],
    [] as Wallet[],
  );

  console.log(`Seeding finished. Closing connection...`);

  connection.close();

  console.log(`Connection closed! Have a good day ✨`);
}

try {
  clean();
  // seed();
} catch (error) {
  console.log(error);
}
