import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { CreateUserRequest } from "./requests/createUser.request";

@Resolver("User")
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query("users")
  async getCampaigns() {
    return this.userService.findAll();
  }

  @Query("user")
  async findOneById(
    @Args("id")
    id: string,
  ): Promise<any> {
    return this.userService.findOneById(id);
  }

  @Mutation()
  createUser(@Args("req") req: CreateUserRequest): Promise<any> {
    return this.userService.create(req);
  }
}
