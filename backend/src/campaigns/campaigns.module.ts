import { Module } from "@nestjs/common";
import { CampaignsResolver } from "./campaigns.resolver";
import { CampaignsService } from "./campaigns.service";
import { UsersService } from "../users/users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Campaign, CampaignSchema } from "./campaign.schema";
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Campaign.name,
        schema: CampaignSchema,
      },
    ]),
  ],
  exports: [CampaignsService],
  providers: [CampaignsService, UsersService, CampaignsResolver],
})
export class CampaignsModule {}
