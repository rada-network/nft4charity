import {
  BadRequestException,
  NotFoundException,
  UseGuards,
} from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import {
  AuthGuard,
  CurrentUser,
  Roles,
  RolesGuard,
  SystemRole,
} from "src/common";
import { Campaign, CampaignMember, User } from "src/entities";
import { getMongoRepository } from "typeorm";
import { CampaignRole } from "./../common/enums/role.enum";

@Resolver(() => CampaignMember)
export class CampaignMemberResolver {
  @Query(() => [CampaignMember])
  async distributors(
    @Args("campaignId") campaignId: string,
  ): Promise<CampaignMember[]> {
    const campaign = await getMongoRepository(Campaign).findOne(campaignId);
    if (!campaign) {
      throw new NotFoundException("Campaign not found.");
    }

    return getMongoRepository(CampaignMember).find({
      campaignId: campaign._id.toString(),
      role: CampaignRole.DISTRIBUTOR,
    });
  }

  @Roles(SystemRole.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @Mutation(() => CampaignMember)
  async createDistributor(
    @Args("campaignId") campaignId: string,
    @CurrentUser() user: User | null,
  ): Promise<CampaignMember> {
    if (!user) {
      throw new NotFoundException(
        "User not found, please register your info fisrt.",
      );
    }

    const campaign = await getMongoRepository(Campaign).findOne(campaignId);
    if (!campaign) {
      throw new NotFoundException("Campaign not found.");
    }

    const member = await getMongoRepository(CampaignMember).findOne({
      campaignId,
      userId: user._id.toString(),
    });
    if (member) {
      throw new BadRequestException("You already a member of this campaign.");
    }

    const now = Date.now();
    const distributor = getMongoRepository(CampaignMember).create({
      campaignId: campaign._id.toString(),
      userId: user._id.toString(),
      isPrivate: false,
      isVerified: false,
      role: CampaignRole.DISTRIBUTOR,
      createdAt: now,
      updatedAt: now,
    });

    return getMongoRepository(CampaignMember).save(distributor);
  }

  @Roles(SystemRole.ADMIN, CampaignRole.CAMPAIGN_CREATOR)
  @UseGuards(AuthGuard, RolesGuard)
  @Mutation(() => Boolean)
  async approveDistributor(
    @Args("campaignId") campaignId: string,
    @Args("distributorId") distributorId: string,
    @CurrentUser() user: User | null,
  ): Promise<boolean> {
    if (!user) {
      return false;
    }

    const member = await getMongoRepository(CampaignMember).findOne({
      campaignId,
      userId: distributorId,
    });
    if (!member || member.role !== CampaignRole.DISTRIBUTOR) {
      throw new BadRequestException(
        "User is not a distributor of this campaign",
      );
    }
    member.isVerified = true;
    await getMongoRepository(CampaignMember).save(member);

    return true;
  }
}
