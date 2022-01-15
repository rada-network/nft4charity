import {
  BadRequestException,
  NotFoundException,
  UseGuards,
} from "@nestjs/common";
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { getMongoRepository } from "typeorm";
import {
  AuthGuard,
  CurrentUserAddress,
  SystemRole,
  Roles,
  RolesGuard,
} from "../common";
import { CreateUserDto, UpdateUserDto } from "../dtos";
import { Campaign, Image, User, Wallet, WalletBasic } from "../entities";

@Resolver(() => User)
export class UserResolver {
  async users(): Promise<User[]> {
    return getMongoRepository(User).find();
  }

  @Query(() => User)
  async user(@Args("id") id: string): Promise<User> {
    const user = await getMongoRepository(User).findOne(id);
    if (!user) {
      throw new NotFoundException("User not found.");
    }
    return user;
  }

  @Query(() => User)
  @Roles(SystemRole.USER)
  @UseGuards(AuthGuard, RolesGuard)
  async me(
    @CurrentUserAddress() currentUserAddress: string | null,
  ): Promise<User> {
    const wallet = await getMongoRepository(Wallet).findOne({
      address: currentUserAddress,
    });
    if (!wallet) {
      throw new NotFoundException("Not found wallet.");
    }

    const user = await getMongoRepository(User).findOne(wallet.userId);
    if (!user) {
      throw new NotFoundException("Not found user.");
    }

    return user;
  }

  @Query(() => String)
  @UseGuards(AuthGuard, RolesGuard)
  async myAddress(
    @CurrentUserAddress() address: string | null,
  ): Promise<string | null> {
    return address;
  }

  @ResolveField(() => [WalletBasic])
  async wallets(@Parent() user: User): Promise<WalletBasic[]> {
    const wallets = await getMongoRepository(Wallet).find({
      userId: user._id.toString(),
    });
    return wallets.map((w) => ({ _id: w._id.toString(), address: w.address }));
  }

  @ResolveField(() => [Image])
  async images(@Parent() user: User): Promise<Image[]> {
    const images = await getMongoRepository(Image).find({
      userId: user._id.toString(),
    });
    return images;
  }

  @ResolveField(() => [String])
  async campaignIds(@Parent() user: User): Promise<string[]> {
    const campaigns = await getMongoRepository(Campaign).find({
      userId: user._id.toString(),
    });
    return campaigns.map((c) => c._id.toString());
  }

  @Mutation(() => User)
  @UseGuards(AuthGuard, RolesGuard)
  async createUser(
    @Args("user") userInput: CreateUserDto,
    @CurrentUserAddress() userAddress: string | null,
  ): Promise<User> {
    const { wallet: createWalletDto, ...createUserDto } = userInput;
    const userRepo = getMongoRepository(User);
    const walletRepo = getMongoRepository(Wallet);

    const wallet = await walletRepo.findOne({
      address: userAddress,
    });

    if (wallet) {
      throw new BadRequestException("User alrealy exist.");
    }

    const user = await userRepo.findOne({
      email: userInput.email,
    });

    if (user) {
      throw new BadRequestException(
        "Email already exist, use create wallet instead.",
      );
    }

    const now = new Date();
    const newUser = await userRepo.save(
      userRepo.create({
        ...createUserDto,
        createdAt: now,
        updatedAt: now,
      }),
    );

    walletRepo.save(
      walletRepo.create({
        ...createWalletDto,
        createdAt: now,
        updatedAt: now,
        address: userAddress,
        userId: newUser._id.toString(),
      }),
    );

    return newUser;
  }

  @Mutation(() => User)
  @Roles(SystemRole.USER)
  @UseGuards(AuthGuard, RolesGuard)
  async updateUser(
    @CurrentUserAddress() currentUserAddress: string | null,
    @Args("user", { nullable: true, defaultValue: {} })
    updateUserDto?: UpdateUserDto,
  ): Promise<User> {
    const wallet = await getMongoRepository(Wallet).findOne({
      address: currentUserAddress,
    });
    if (!wallet) {
      throw new NotFoundException("Not found user.");
    }
    const user = await getMongoRepository(User).findOne(wallet.userId);

    return await getMongoRepository(User).save(
      new User({ ...user, ...updateUserDto }),
    );
  }
}
