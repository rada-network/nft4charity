import { Args, Query, Resolver } from "@nestjs/graphql";
import { getMongoRepository } from "typeorm";
import { User } from "../entities";

@Resolver("User")
export class UserResolver {
  @Query((returns) => [User]) // eslint-disable-line
  async users(): Promise<User[]> {
    return getMongoRepository(User).find();
  }

  @Query((returns) => User) // eslint-disable-line
  async user(@Args("id") id: string): Promise<User> {
    return getMongoRepository(User).findOne({ _id: id });
  }
}
