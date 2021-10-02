import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateUserDto } from "src/dtos";
import { getMongoRepository } from "typeorm";
import { User } from "../entities";

@Resolver((of) => User) // eslint-disable-line
export class UserResolver {
  @Query((returns) => [User]) // eslint-disable-line
  async users(): Promise<User[]> {
    return getMongoRepository(User).find();
  }

  @Query((returns) => User) // eslint-disable-line
  async user(@Args("id") id: string): Promise<User> {
    const user = await getMongoRepository(User).findOne({ _id: id });

    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Mutation((returns) => User) // eslint-disable-line
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
