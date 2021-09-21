import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { User } from "src/users/user.schema";
import { UsersService } from "../users/users.service";
import { Campaign } from "./campaign.schema";
import { CampaignsService } from "./campaigns.service";
import { CreateCampaignRequest } from "./requests/createCampaign.request";

@Resolver((of) => Campaign)
export class CampaignsResolver {
  constructor(
    private readonly userService: UsersService,
    private readonly campaignService: CampaignsService,
  ) {}

  @Query((returns) => [Campaign])
  async campaigns() {
    return this.campaignService.findAll();
  }

  @Query((returns) => Campaign)
  async campaign(
    @Args("id")
    id: string,
  ): Promise<Campaign> {
    return this.campaignService.findOneById(id);
  }

  @ResolveField((returns) => String)
  async id(@Parent() campaign): Promise<string> {
    return campaign._id;
  }

  @ResolveField((returns) => User)
  async user(@Parent() campaign): Promise<User> {
    return this.userService.findOneById(campaign.userId);
  }

  @Mutation((returns) => Campaign)
  createCampaign(
    @Args("campaign") campaign: CreateCampaignRequest,
  ): Promise<Campaign> {
    return this.campaignService.create(campaign);
  }
}
