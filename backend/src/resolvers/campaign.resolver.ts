import { CampaignMember } from "src/entities";
import { NotFoundException, UseGuards } from "@nestjs/common";
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import {
  AuthGuard,
  CampaignRole,
  CampaignType,
  CurrentUser,
  Roles,
  RolesGuard,
  SystemRole,
} from "src/common";
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
  @Roles(SystemRole.USER)
  @UseGuards(AuthGuard, RolesGuard)
  async createCampaign(
    @Args("campaign") campaignInput: CreateCampaignDto,
    @CurrentUser() user: User | null,
  ): Promise<Campaign> {
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const now = new Date();
    const newCampaign = await getMongoRepository(Campaign).create({
      ...campaignInput,
      userId: user._id.toString(),
      createdAt: now,
      updatedAt: now,
    });
    await getMongoRepository(Campaign).save(newCampaign);

    const member = await getMongoRepository(CampaignMember).create({
      campaignId: newCampaign._id.toString(),
      userId: user._id.toString(),
      createdAt: now,
      updatedAt: now,
      isPrivate: false,
      isVerified: false,
      role: CampaignRole.CAMPAIGN_CREATOR,
    });
    await getMongoRepository(CampaignMember).save(member);

    return newCampaign;
  }
}
