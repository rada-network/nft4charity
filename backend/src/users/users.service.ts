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

  findAll(): any {
    return this.userModel.find().exec();
  }

  async findOneById(id: string): Promise<any> {
    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async create(req: CreateUserRequest): Promise<User> {
    const createdAt = new Date();
    console.log(req);
    return new this.userModel({
      ...req,
      createdAt,
    }).save();
  }
}
