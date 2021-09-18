import { Module } from "@nestjs/common";
import { CampaignsResolver } from "./campaigns.resolver";
import { CampaignsService } from "./campaigns.service";
import { UsersService } from "../users/users.service";

@Module({
  providers: [CampaignsService, UsersService, CampaignsResolver],
})
export class CampaignsModule {}
