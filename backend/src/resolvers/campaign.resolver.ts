import { NotFoundException } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import CreateCampaignDto from "src/dtos/campaigns/createCampaign.dto";
import { Campaign } from "src/entities";
import { getMongoRepository } from "typeorm";

@Resolver((of) => Campaign) // eslint-disable-line
export class CampaignResolver {
  @Query((returns) => [Campaign]) // eslint-disable-line
  async campaigns(): Promise<Campaign[]> {
    return getMongoRepository(Campaign).find();
  }

  @Query((returns) => Campaign) // eslint-disable-line
  async campaign(@Args("id") id: string): Promise<Campaign> {
    const campaign = await getMongoRepository(Campaign).findOne(id);

    if (!campaign) {
      throw new NotFoundException("Campaign not found.");
    }

    return campaign;
  }

  @Mutation((returns) => Campaign) // eslint-disable-line
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
