import { NotFoundException } from "@nestjs/common";
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { CreateWalletDto, WalletFilterDto } from "src/dtos";
import { Campaign, Transaction, User, Wallet } from "src/entities";
import { getMongoRepository, SelectQueryBuilder } from "typeorm";

type entryType = [key: string, value: string | number | boolean];

function buildFilterQuery<T>(
  query: SelectQueryBuilder<T>,
  table: string,
  entries: entryType[],
): SelectQueryBuilder<T> {
  let isFirstWhere = true;

  entries.forEach(([key, value]) => {
    if (value) {
      const queryString = `${table}.${key} = :${key}`;
      const queryObj = { [key]: value };
      if (isFirstWhere) {
        isFirstWhere = false;
        query = query.where(queryString, queryObj);
      } else {
        query = query.andWhere(queryString, queryObj);
      }
    }
  });

  return query;
}

@Resolver(() => Wallet)
export class WalletResolver {
  @Query(() => Wallet)
  async wallet(@Args("id") id: string): Promise<Wallet> {
    const wallet = await getMongoRepository(Wallet).findOne(id);

    if (!wallet) {
      throw new NotFoundException("Wallet not found.");
    }

    return wallet;
  }

  @Query(() => [Wallet])
  async walletsFilter(
    @Args("wallet") walletFilterArgs: WalletFilterDto,
  ): Promise<Wallet[]> {
    const entries = Object.entries(walletFilterArgs);

    let query = await getMongoRepository(Wallet).createQueryBuilder("wallet");
    query = buildFilterQuery<Wallet>(query, "wallet", entries);

    return query.getRawMany();
  }

  @ResolveField(() => User)
  async user(@Parent() wallet: Wallet): Promise<User> {
    const user = await getMongoRepository(User).findOne(wallet.userId);
    if (!user) {
      throw new NotFoundException("User not found.");
    }

    return user;
  }

  @ResolveField(() => Campaign)
  async campaign(@Parent() wallet: Wallet): Promise<Campaign> {
    if (!wallet.campaignId) {
      return null;
    }
    const campaign = await getMongoRepository(Campaign).findOne(
      wallet.campaignId,
    );

    if (!campaign) {
      throw new NotFoundException("Campaign not found.");
    }

    return campaign;
  }

  @ResolveField(() => [Transaction])
  async transaction(@Parent() wallet): Promise<Transaction[]> {
    const walletId = wallet._id.toString();
    const transactions = await getMongoRepository(Transaction).find({
      walletId: walletId,
    });
    if (!transactions) {
      throw new NotFoundException("Transactions are not found.");
    }

    return transactions;
  }

  @Mutation(() => Wallet)
  async createWallet(@Args("wallet") walletInput: CreateWalletDto) {
    const { userId, campaignId } = walletInput;

    const user = await getMongoRepository(User).findOne(userId);
    if (!user) {
      throw new NotFoundException("User not found.");
    }

    if (campaignId) {
      const campaign = await getMongoRepository(Campaign).findOne(campaignId);
      if (!campaign) {
        throw new NotFoundException("Campaign not found.");
      }
    }

    const now = new Date();
    const wallet = await getMongoRepository(Wallet).create({
      ...walletInput,
      createdAt: now,
      updatedAt: now,
    });

    return getMongoRepository(Wallet).save(wallet);
  }
}
