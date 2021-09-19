import { Module } from "@nestjs/common";
import { CampaignsResolver } from "./campaigns.resolver";
import { CampaignsService } from "./campaigns.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Campaign, CampaignSchema } from "./campaign.schema";
import { UsersModule } from "src/users/users.module";
import { UsersService } from "../users/users.service";
import { User, UserSchema } from "src/users/user.schema";
@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Campaign.name,
        schema: CampaignSchema,
      },
    ]),
  ],
  providers: [UsersService, CampaignsService, CampaignsResolver],
})
export class CampaignsModule {}
