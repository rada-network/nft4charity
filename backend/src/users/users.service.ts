import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserRequest } from "./requests/createUser.request";
import { User } from "./user.schema";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async create(req: CreateUserRequest): Promise<User> {
    const createdAt = new Date();
    return new this.userModel({
      ...req,
      createdAt,
    }).save();
  }
}
