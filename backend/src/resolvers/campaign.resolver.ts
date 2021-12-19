import { NotFoundException } from "@nestjs/common";
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { CampaignType } from "src/common";
import { getMongoRepository } from "typeorm";
import { CreateCampaignDto, GetCampaignsDto } from "../dtos";
import {
  Campaign,
  CampaignNftMetaData,
  User,
  Wallet,
  WalletBasic,
} from "../entities";

@Resolver(() => Campaign)
export class CampaignResolver {
  @Query(() => [Campaign])
  async campaigns(
    @Args() getCampaignsDto?: GetCampaignsDto,
  ): Promise<Campaign[]> {
    if (!getCampaignsDto || !getCampaignsDto.type) {
      return getMongoRepository(Campaign).find();
    }

    if (getCampaignsDto.type === CampaignType.FUND_RAISE) {
      return getMongoRepository(Campaign).find({
        where: {
          $or: [
            { type: CampaignType.FUND_RAISE },
            { type: { $exists: false } },
          ],
        },
      });
    }

    return getMongoRepository(Campaign).find({ ...getCampaignsDto });
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

  @ResolveField(() => CampaignNftMetaData, { nullable: true })
  async nftMetadata(
    @Parent() campaign: Campaign,
  ): Promise<CampaignNftMetaData | null> {
    if (campaign.type !== CampaignType.NFT) {
      return null;
    }

    return await getMongoRepository(CampaignNftMetaData).findOne({
      campaignId: campaign._id.toString(),
    });
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
