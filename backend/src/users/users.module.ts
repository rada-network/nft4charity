import { Module } from "@nestjs/common";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "../users/users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.schema";
import { CampaignsService } from "src/campaigns/campaigns.service";
import { Campaign, CampaignSchema } from "src/campaigns/campaign.schema";
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Campaign.name,
        schema: CampaignSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  exports: [UsersService],
  providers: [CampaignsService, UsersService, UsersResolver],
})
export class UsersModule {}
