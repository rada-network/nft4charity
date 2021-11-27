import { registerEnumType } from "@nestjs/graphql";

export enum CampaignType {
  AUCTION,
  FUND_RAISE,
  NFT,
}

registerEnumType(CampaignType, {
  name: "CampaignType",
});
