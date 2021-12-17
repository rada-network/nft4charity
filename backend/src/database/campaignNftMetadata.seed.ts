import * as dotenv from "dotenv";
import { datatype } from "faker";
import { resolve } from "path";
import {
  ConnectionOptions,
  createConnection,
  getMongoRepository,
} from "typeorm";
import { CampaignType } from "../common";
import {
  Campaign,
  CampaignNftMetaData,
  Transaction,
  User,
  Wallet,
} from "../entities";
import { generateTransaction, generateWallet } from "./utils";

dotenv.config();

if (!process.env.MONGODB_SEEDING_URL) {
  throw new Error("Please provide the MONGDB_SEEDING_URL to .env");
}

const numberOfItemsPerCampaign = 10;
const startNumber =
  "0000000000000000000000000000000000000000000000000000000000000001";
const folderId = "QmNnQ2WwSMpdjtD5xvDXUtKqpP9raDcanPBqeXwxXjFWZa";
const imageUrl =
  "https://images.unsplash.com/photo-1591522810850-58128c5fb089?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
const numberOfTransaction = 5;

const config: ConnectionOptions = {
  type: "mongodb",
  url: process.env.MONGODB_SEEDING_URL || "",
  entities: [
    resolve(__dirname, "../**/*.entity{.ts,.js}"),
    CampaignNftMetaData,
  ],
  synchronize: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

async function seed() {
  console.log("Connecting to mongodb... 🚀");

  const connection = await createConnection(config);
  const campaignRepo = connection.getMongoRepository(Campaign);
  const campaignNftMetaData =
    connection.getMongoRepository(CampaignNftMetaData);

  console.log("Connected ✅");

  const users = await getMongoRepository(User).find();
  const randomIdx = datatype.number({ min: 0, max: users.length - 1 });
  const randomUser = users[randomIdx];
  const now = new Date();

  const campaign = await campaignRepo.save(
    campaignRepo.create({
      coverImgUrl: imageUrl,
      createdAt: now,
      description: "NFT Campaign for Charity",
      endedAt: new Date("2021-12-31"),
      goal: 100,
      name: "NFT Campaign for Charity",
      startedAt: new Date("2021--11-01"),
      thumbnailImgUrl: imageUrl,
      type: CampaignType.NFT,
      updatedAt: now,
      userId: randomUser._id.toString(),
    }),
  );

  campaignNftMetaData.save(
    campaignNftMetaData.create({
      campaignId: campaign._id.toString(),
      nftMetaData: {
        folderId,
        startNumber,
        total: numberOfItemsPerCampaign,
      },
    }),
  );

  console.log(`Generated campaign with id: ${campaign._id.toString()}`);

  console.log(
    `Generating wallet with user id: ${randomUser._id.toString()} and campaign id: ${campaign._id.toString()}`,
  );
  const wallet = await generateWallet(
    getMongoRepository(Wallet),
    randomUser._id.toString(),
    campaign._id.toString(),
  );
  console.log(`Generated wallet with id: ${wallet._id.toString()}`);

  for (let i = 0; i < numberOfTransaction; i++) {
    await generateTransaction(
      getMongoRepository(Transaction),
      wallet._id.toString(),
    );
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
