import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { Campaign } from "src/campaigns/campaign.schema";
import { CampaignsService } from "../campaigns/campaigns.service";
import { CreateUserRequest } from "./requests/createUser.request";
import { User } from "./user.schema";
import { UsersService } from "./users.service";

@Resolver((of) => User)
export class UsersResolver {
  constructor(
    private readonly userService: UsersService,
    private readonly campaignSevice: CampaignsService,
  ) {}

  @Query((returns) => [User])
  users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query((returns) => User)
  async user(
    @Args("id")
    id: string,
  ): Promise<User> {
    return this.userService.findOneById(id);
  }

  @ResolveField((returns) => String)
  async id(@Parent() user): Promise<string> {
    return user._id;
  }

  @ResolveField((returns) => [Campaign])
  campaigns(@Parent() user): Promise<Campaign[]> {
    return this.campaignSevice.findByUserId(user._id);
  }

  @Mutation((returns) => User)
  createUser(@Args("user") user: CreateUserRequest): Promise<User> {
    return this.userService.create(user);
  }
}
