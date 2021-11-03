import * as dotenv from "dotenv";
import {
  commerce,
  company,
  datatype,
  date,
  finance,
  image,
  internet,
  lorem,
  name,
} from "faker";
import { resolve } from "path";
import { ConnectionOptions, createConnection } from "typeorm";
import { Campaign, Transaction, User, Wallet } from "../entities";

const numberOfUsers = 3;
const numberOfCampaigns = 5;
const numberOfWallets = 7;
const numberOfTransactions = 15;

dotenv.config();

if (!process.env.MONGODB_SEEDING_URL) {
  throw new Error("Please provide the MONGDB_SEEDING_URL to .env");
}

const config: ConnectionOptions = {
  type: "mongodb",
  url: process.env.MONGODB_SEEDING_URL || "",
  entities: [resolve(__dirname, "../**/*.entity{.ts,.js}")],
  synchronize: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { hexaDecimal, boolean, number, float } = datatype;

async function seed() {
  console.log("Connecting to mongodb... 🚀");

  const connection = await createConnection(config);

  console.log("Connected ✅");

  const userRepo = await connection.getMongoRepository(User);
  const campaignRepo = await connection.getMongoRepository(Campaign);
  const walletRepo = await connection.getMongoRepository(Wallet);
  const transactionRepo = await connection.getMongoRepository(Transaction);

  const users: User[] = [];
  const campaigns: Campaign[] = [];
  const wallets: Wallet[] = [];
  const transactions: Transaction[] = [];

  console.log(`Saving ${numberOfUsers} user(s) to the database...`);

  for (let i = 0; i < numberOfUsers; i++) {
    const user = userRepo.create({
      firstName: name.findName(),
      lastName: name.lastName(),
      email: internet.email(),
    });

    await userRepo.save(user);
    users.push(user);

    console.log(`Saved ${i + 1} user(s) 👍🏻`);
  }

  console.log(`Saving ${numberOfCampaigns} campaign(s) to the database...`);

  for (let i = 0; i < numberOfCampaigns; i++) {
    const campaign = campaignRepo.create({
      name: company.companyName(),
      description: boolean() ? commerce.productDescription() : null,
      goal: boolean() ? datatype.number({ min: 5000, max: 10000 }) : null,
      startedAt: boolean() ? date.past() : null,
      endedAt: boolean() ? date.future() : null,
      coverImgUrl: boolean() ? image.nature() : null,
      thumbnailImgUrl: boolean() ? image.nature() : null,
    });

    const randomIndex = number({ min: 0, max: users.length - 1 });
    campaign.userId = users[randomIndex]._id.toString();

    await campaignRepo.save(campaign);
    campaigns.push(campaign);

    console.log(`Saved ${i + 1} campaign(s) 👍🏻`);
  }

  console.log(`Saving ${numberOfWallets} wallet(s) to the database...`);

  for (let i = 0; i < numberOfWallets; i++) {
    const wallet = walletRepo.create({
      address: finance.ethereumAddress(),
      currency: datatype.number() % 2 ? "ETH" : null,
      platform: datatype.number() % 2 ? "Binance" : "Ether",
      isVerified: false,
    });

    const randomIndex = number({ min: 0, max: users.length - 1 });
    wallet.userId = users[randomIndex]._id.toString();

    if (boolean()) {
      const rdIdx = number({ min: 0, max: campaigns.length - 1 });
      wallet.campaignId = campaigns[rdIdx]._id.toString();
    } else {
      wallet.campaignId = null;
    }

    await walletRepo.save(wallet);
    wallets.push(wallet);

    console.log(`Saved ${i + 1} wallet(s) 🗂`);
  }

  console.log(
    `Saving ${numberOfTransactions} transaction(s) to the database...`,
  );

  for (let i = 0; i < numberOfTransactions; i++) {
    const transaction = transactionRepo.create({
      sourceAddress: boolean() ? finance.ethereumAddress() : null,
      description: boolean() ? lorem.sentence() : null,
      currency: boolean() ? "ETH" : null,
      amount: number({ min: 100, max: 1500 }) / 10000000,
      status: boolean() ? `${number() % 2}` : null,
      networkFee: boolean() ? number({ min: 100, max: 1500 }) / 10000000 : null,
      transactionId: hexaDecimal(64),
    });

    const randomIndex = number({ min: 0, max: wallets.length - 1 });
    transaction.walletId = wallets[randomIndex]._id.toString();

    await transactionRepo.save(transaction);
    transactions.push(transaction);

    console.log(`Save ${i + 1} transaction(s) 👏🏻.`);
  }

  console.log(`Seeding finished. Closing connection...`);

  connection.close();

  console.log(`Connection closeed! Have a good day ✨`);
}

try {
  seed();
} catch (error) {
  console.log(error);
}
