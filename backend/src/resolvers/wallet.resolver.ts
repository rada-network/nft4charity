import { NotFoundException } from "@nestjs/common";
import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { User } from "src/entities";
import { Transaction } from "src/entities/transaction.entity";
import { Wallet } from "src/entities/wallet.entity";
import { getMongoRepository } from "typeorm";

@Resolver(() => Wallet) // eslint-disable-line
export class WalletResolver {
  @Query(() => Wallet) // eslint-disable-line
  async wallet(@Args("id") id: string): Promise<Wallet> {
    const wallet = await getMongoRepository(Wallet).findOne(id);

    if (!wallet) {
      throw new NotFoundException("Campaign not found.");
    }

    return wallet;
  }

  @ResolveField(() => User)
  async user(@Parent() wallet): Promise<User> {
    const user = await getMongoRepository(User).findOne(wallet.userId);
    if (!user) {
      throw new NotFoundException("User not found.");
    }

    return user;
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
}
