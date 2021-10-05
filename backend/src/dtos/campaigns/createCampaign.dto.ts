import { Field, InputType, Int } from "@nestjs/graphql";
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from "class-validator";

@InputType()
export default class CreateCampaignDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  goal?: number;

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  startedAt?: Date;

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  endedAt?: Date;

  @Field()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @Field({ nullable: true })
  @IsUrl()
  @IsOptional()
  coverImgUrl?: string;

  @Field({ nullable: true })
  @IsUrl()
  @IsOptional()
  thumbnailImgUrl?: string;
}
