import { registerEnumType } from "@nestjs/graphql";

export enum SystemRole {
  ADMIN = "admin",
  USER = "user",
}

registerEnumType(SystemRole, {
  name: "SystemRole",
});

export enum CampaignRole {
  CAMPAIGN_CREATOR = "campaign_creator",
  DISTRIBUTOR = "distributor",
  DONOR = "donor",
}

registerEnumType(CampaignRole, {
  name: "CampaignRole",
});
