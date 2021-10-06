import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Serialize } from "src/common";
import { CreateUserDto, UserDto } from "src/dtos";
import { getMongoRepository } from "typeorm";
import { User } from "../entities";

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return getMongoRepository(User).find();
  }

  @Query(() => User)
  async user(@Args("id") id: string): Promise<User> {
    const user = await getMongoRepository(User).findOne(id);

    if (!user) {
      throw new NotFoundException("User not found.");
    }

    return user;
  }

  @Mutation(() => User)
  async createUser(@Args("user") userInput: CreateUserDto): Promise<User> {
    const { email } = userInput;
    const user = await getMongoRepository(User).findOne({ email });
    if (user) {
      throw new BadRequestException("User already exist!");
    }

    const now = new Date();
    const newUser = getMongoRepository(User).create({
      ...userInput,
      createdAt: now,
      updatedAt: now,
    });

    return getMongoRepository(User).save(newUser);
  }
}
