import { NotFoundException } from "@nestjs/common";
import {
  Args,
  Float,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { PaginationParamsDto } from "src/common";
import {
  CreateWalletDto,
  PaginatedTransaction,
  WalletFilterDto,
} from "src/dtos";
import { Campaign, Transaction, User, Wallet } from "src/entities";
import { FindManyOptions, getMongoRepository } from "typeorm";

type entryType = [key: string, value: string | number | boolean];

function buildFilterOptions(
  entries: entryType[],
): Partial<Wallet> | FindManyOptions<Wallet> {
  const filterOptions: Partial<Wallet> | FindManyOptions<Wallet> = {};

  entries.forEach(([key, value]) => {
    filterOptions[key] = { $eq: value };
  });

  return filterOptions;
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
  async walletFilter(
    @Args() walletFilterArgs?: WalletFilterDto,
  ): Promise<Wallet[]> {
    const entries = Object.entries(walletFilterArgs || {});

    const walletRepo = getMongoRepository(Wallet);

    const filterOptions = buildFilterOptions(entries);

    if (Object.keys(filterOptions)) {
      return walletRepo.find({ where: filterOptions });
    }

    return walletRepo.find();
  }

  @ResolveField(() => Float)
  async balance(@Parent() wallet: Wallet): Promise<number> {
    const transactions = await getMongoRepository(Transaction).find({
      walletId: wallet._id.toString(),
    });

    return transactions.reduce((acc, cur) => {
      return acc + cur.amount;
    }, 0);
  }

  @ResolveField(() => User)
  async user(@Parent() wallet: Wallet): Promise<User> {
    const user = await getMongoRepository(User).findOne(wallet.userId);
    if (!user) {
      throw new NotFoundException("User not found.");
    }

    return user;
  }

  @ResolveField(() => Campaign, { nullable: true })
  async campaign(@Parent() wallet: Wallet): Promise<Campaign | null> {
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

  @ResolveField(() => PaginatedTransaction)
  async transaction(
    @Parent() wallet,
    @Args() paginationParams?: PaginationParamsDto,
  ): Promise<PaginatedTransaction> {
    const walletId = wallet._id.toString();
    const { limit, offset } = paginationParams;

    const [transactions, total] = await getMongoRepository(
      Transaction,
    ).findAndCount({
      where: { walletId },
      order: { createdAt: "DESC" },
      take: limit,
      skip: offset,
    });

    if (!transactions) {
      throw new NotFoundException("Transactions are not found.");
    }

    const res: PaginatedTransaction = {
      data: transactions,
      meta: { limit, offset, total },
    };

    return res;
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
