import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateCampaignRequest } from "./requests/createCampaign.request";
import { Campaign } from "./campaign.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class CampaignsService {
  constructor(
    @InjectModel(Campaign.name) private readonly campaignModel: Model<Campaign>,
  ) {}

  async findAll(): Promise<Campaign[]> {
    return this.campaignModel.find().exec();
  }

  async findOneById(id: string): Promise<Campaign> {
    const campaign = await this.campaignModel.findOne({ _id: id });
    if (!campaign) {
      throw new NotFoundException();
    }
    return campaign;
  }

  async create(req: CreateCampaignRequest): Promise<Campaign> {
    const startedAt = new Date();
    const endedAt = startedAt;
    const existCampaign = await this.campaignModel.findOne({
      userId: req.userId,
      name: req.name,
    });

    if (existCampaign) {
      throw new BadRequestException({
        description: "Campaign already exists.",
      });
    }

    return new this.campaignModel({
      ...req,
      startedAt,
      endedAt,
    }).save();
  }

  async findByUserId(userId: string): Promise<Campaign[]> {
    return this.campaignModel.find({ userId });
  }
}
