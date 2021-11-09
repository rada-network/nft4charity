import { NotFoundException } from "@nestjs/common";
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import CreateCampaignDto from "src/dtos/campaigns/createCampaign.dto";
import { Campaign, User, Wallet, WalletBasic } from "src/entities";
import { getMongoRepository } from "typeorm";

@Resolver(() => Campaign)
export class CampaignResolver {
  @Query(() => [Campaign])
  async campaigns(): Promise<Campaign[]> {
    return getMongoRepository(Campaign).find();
  }

  @Query(() => Campaign)
  async campaign(@Args("id") id: string): Promise<Campaign> {
    const campaign = await getMongoRepository(Campaign).findOne(id);

    if (!campaign) {
      throw new NotFoundException("Campaign not found.");
    }

    return campaign;
  }

  @ResolveField(() => [WalletBasic])
  async wallets(@Parent() campaign: Campaign): Promise<WalletBasic[]> {
    const wallets = await getMongoRepository(Wallet).find({
      campaignId: campaign._id.toString(),
    });

    return wallets.map((w) => ({ _id: w._id.toString(), address: w.address }));
  }

  @Mutation(() => Campaign)
  async createCampaign(
    @Args("campaign") campaignInput: CreateCampaignDto,
  ): Promise<Campaign> {
    const { userId } = campaignInput;
    const user = await getMongoRepository(User).findOne(userId);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const now = new Date();
    const newCampaign = getMongoRepository(Campaign).create({
      ...campaignInput,
      createdAt: now,
      updatedAt: now,
    });
    return getMongoRepository(Campaign).save(newCampaign);
  }
}
