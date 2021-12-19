import { ArgsType, Field } from "@nestjs/graphql";
import { Expose } from "class-transformer";
import { IsEnum, IsOptional } from "class-validator";
import { CampaignType } from "src/common";

@ArgsType()
export class GetCampaignsDto {
  @Expose()
  @Field(() => CampaignType, { nullable: true })
  @IsEnum(CampaignType)
  @IsOptional()
  type?: CampaignType;
}
