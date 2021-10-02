import { Field, InputType } from "@nestjs/graphql";
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

@InputType()
export default class CreateCampaignDto {
  @Field()
  @IsString()
  @Min(3)
  @Max(20)
  name: string;

  @Field()
  @IsString()
  @IsOptional()
  description?: string;

  @Field()
  @IsNumber()
  @IsOptional()
  goad?: number;

  @Field()
  @IsDate()
  @IsOptional()
  startedAt?: Date;

  @Field()
  @IsDate()
  @IsOptional()
  endedAt?: Date;
}
