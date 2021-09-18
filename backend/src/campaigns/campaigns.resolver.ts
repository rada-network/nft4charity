import { ParseIntPipe } from "@nestjs/common";
import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { CampaignsService } from "./campaigns.service";
import { UsersService } from "../users/users.service";

@Resolver("Campaign")
export class CampaignsResolver {
  constructor(
    private readonly campaignService: CampaignsService,
    private readonly userService: UsersService,
  ) {}

  @Query("campaigns")
  async getCats() {
    return this.campaignService.findAll();
  }

  @Query("campaign")
  async findOneById(
    @Args("id", ParseIntPipe)
    id: number,
  ): Promise<any> {
    return this.campaignService.findOneById(id);
  }

  @ResolveField("user")
  async user(@Parent() campaign): Promise<any> {
    return this.userService.findOneById(campaign.userId);
  }
}
