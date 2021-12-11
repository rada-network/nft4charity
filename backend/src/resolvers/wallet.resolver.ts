import {
  BadRequestException,
  NotFoundException,
  UseGuards,
} from "@nestjs/common";
import {
  Args,
  Float,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { FindManyOptions, getMongoRepository } from "typeorm";
import { AuthGuard, CurrentUserAddress, PaginationParamsDto } from "../common";
import {
  CreateWalletDto,
  PaginatedTransaction,
  WalletFilterDto,
} from "../dtos";
import { Campaign, Transaction, User, Wallet, WalletBasic } from "../entities";

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

@Resolver(() => WalletBasic)
export class WalletBasicResolver {
  @ResolveField(() => Float)
  async balance(@Parent() wallet: Wallet): Promise<number> {
    const transactions = await getMongoRepository(Transaction).find({
      walletId: wallet._id.toString(),
    });

    return transactions.reduce((acc, cur) => {
      return acc + cur.amount;
    }, 0);
  }

  @ResolveField(() => Int)
  async numberOfTransaction(@Parent() wallet): Promise<number> {
    const [_, count] = await getMongoRepository(Transaction).findAndCount({
      walletId: wallet._id.toString(),
    });

    return count;
  }
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

  @ResolveField(() => PaginatedTransaction)
  async transaction(
    @Parent() wallet: Wallet,
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

  @UseGuards(AuthGuard)
  @Mutation(() => Wallet)
  async createWallet(
    @Args("wallet") createWalletDto: CreateWalletDto,
    @CurrentUserAddress() userAddress: string,
  ) {
    const { userEmail, ...createWalletInput } = createWalletDto;
    const user = await getMongoRepository(User).findOne({ email: userEmail });
    if (!user) {
      throw new NotFoundException("Email not registered.");
    }

    if (createWalletDto.campaignId) {
      const campaign = await getMongoRepository(Campaign).findOne(
        createWalletDto.campaignId,
      );
      if (!campaign) {
        throw new NotFoundException("Campaign not found.");
      }
    }

    const wallet = await getMongoRepository(Wallet).findOne({
      address: userAddress,
    });
    if (wallet) {
      throw new BadRequestException("Wallet already exist.");
    }

    const now = new Date();
    const newWallet = getMongoRepository(Wallet).create({
      ...createWalletInput,
      address: userAddress,
      createdAt: now,
      isVerified: false,
      updatedAt: now,
      userId: user._id.toString(),
    });

    return getMongoRepository(Wallet).save(newWallet);
  }
}
