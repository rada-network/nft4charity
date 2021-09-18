import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { CampaignsService } from "./campaigns.service";
import { UsersService } from "../users/users.service";
import { CreateCampaignRequest } from "./requests/createCampaign.request";

@Resolver("Campaign")
export class CampaignsResolver {
  constructor(
    private readonly campaignService: CampaignsService,
    private readonly userService: UsersService,
  ) {}

  @Query("campaigns")
  async getCampaigns() {
    return this.campaignService.findAll();
  }

  @Query("campaign")
  async findOneById(
    @Args("id")
    id: string,
  ): Promise<any> {
    return this.campaignService.findOneById(id);
  }

  @Mutation()
  createCampaign(@Args("req") req: CreateCampaignRequest): Promise<any> {
    return this.campaignService.create(req);
  }

  @ResolveField("user")
  async user(@Parent() campaign): Promise<any> {
    return this.userService.findOneById(campaign.userId);
  }
}
