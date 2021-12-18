import { datatype, finance, lorem } from "faker";
import { MongoRepository } from "typeorm";
import { Wallet, Transaction } from "../entities";

export function generateWallet(
  walletRepo: MongoRepository<Wallet>,
  userId: string,
  campaignId: string = null,
): Promise<Wallet> {
  const now = new Date();

  return walletRepo.save(
    walletRepo.create({
      address: finance.ethereumAddress(),
      currency: "ETH",
      platform: "Binance",
      isVerified: false,
      campaignId,
      userId,
      createdAt: now,
      updatedAt: now,
    }),
  );
}

export function generateTransaction(
  transactionRepo: MongoRepository<Transaction>,
  walletId: string,
): Promise<Transaction> {
  const now = new Date();

  return transactionRepo.save(
    transactionRepo.create({
      sourceAddress: finance.ethereumAddress(),
      description: lorem.sentence(),
      currency: "ETH",
      amount: datatype.number({ min: 100, max: 1500 }) / 10000000,
      status: "1",
      networkFee: datatype.number({ min: 100, max: 1500 }) / 10000000,
      transactionId: datatype.hexaDecimal(64),
      createdAt: now,
      walletId,
    }),
  );
}
