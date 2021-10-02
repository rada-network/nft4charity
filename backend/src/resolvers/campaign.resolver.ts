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
import { Campaign, User } from "src/entities";
import { Wallet } from "src/entities/wallet.entity";
import { getMongoRepository } from "typeorm";

@Resolver(() => Campaign) // eslint-disable-line
export class CampaignResolver {
  @Query(() => [Campaign]) // eslint-disable-line
  async campaigns(): Promise<Campaign[]> {
    return getMongoRepository(Campaign).find();
  }

  @Query(() => Campaign) // eslint-disable-line
  async campaign(@Args("id") id: string): Promise<Campaign> {
    const campaign = await getMongoRepository(Campaign).findOne(id);

    if (!campaign) {
      throw new NotFoundException("Campaign not found.");
    }

    return campaign;
  }

  @ResolveField(() => User)
  async user(@Parent() campaign): Promise<User> {
    const user = await getMongoRepository(User).findOne(campaign.userId);
    if (!user) {
      throw new NotFoundException("User not found.");
    }

    return user;
  }

  @ResolveField(() => [Wallet])
  async wallet(@Parent() campaign): Promise<Wallet[]> {
    const campaignId = campaign._id.toString();
    const wallets = await getMongoRepository(Wallet).find({
      campaignId: campaignId,
    });
    if (!wallets) {
      throw new NotFoundException("Wallets are not found.");
    }

    return wallets;
  }

  @Mutation(() => Campaign) // eslint-disable-line
  async createCampaign(
    @Args("campaign") campaignInput: CreateCampaignDto,
  ): Promise<Campaign> {
    const now = new Date();
    const newCampaign = getMongoRepository(Campaign).create({
      ...campaignInput,
      createdAt: now,
      updatedAt: now,
    });

    return getMongoRepository(Campaign).save(newCampaign);
  }
}
