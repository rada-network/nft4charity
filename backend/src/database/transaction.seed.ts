import * as dotenv from "dotenv";
import { Transaction } from "../entities/";
import { resolve } from "path";
import { ConnectionOptions, createConnection } from "typeorm";
import { datatype, date, finance, lorem } from "faker";

dotenv.config();

const walletIds = ["615db44161c08b12f6b79cce", "615db44161c08b12f6b79ccd"];
const numberOfTransactions = parseInt(process.argv[2]) || 30;

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

const { hexaDecimal, boolean, number } = datatype;

async function seed() {
  console.log("Connecting to mongodb... 🚀");

  const connection = await createConnection(config);
  const transactionRepo = connection.getMongoRepository(Transaction);

  console.log("Connected ✅");

  console.log(
    `Saving ${numberOfTransactions} transaction(s) to the database...`,
  );

  for (let i = 0; i < numberOfTransactions; i++) {
    const transaction = transactionRepo.create({
      sourceAddress: finance.ethereumAddress(),
      description: boolean() ? lorem.sentence() : null,
      currency: "ETH",
      amount: number({ min: 100, max: 1500 }) / 10000000,
      status: "1",
      networkFee: number({ min: 100, max: 1500 }) / 10000000,
      transactionId: hexaDecimal(64),
      createdAt: date.between("2021-10-01", "2021-10-14"),
    });
    transaction.walletId = walletIds[+boolean()];

    await transactionRepo.save(transaction);

    if ((i + 1) % 10 === 0) {
      console.log(`Save ${i + 1} transaction(s) 👏🏻.`);
    }
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
