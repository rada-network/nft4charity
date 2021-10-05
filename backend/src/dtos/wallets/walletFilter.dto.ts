import { Field, InputType } from "@nestjs/graphql";
import { Expose } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsEthereumAddress,
  IsString,
} from "class-validator";

@InputType()
export class WalletFilterDto {
  @Expose()
  @Field({ nullable: true })
  @IsEthereumAddress()
  address?: string;

  @Expose()
  @Field({ nullable: true })
  @IsString()
  currency?: string;

  @Expose()
  @Field({ nullable: true })
  @IsString()
  platform?: string;

  @Expose()
  @Field({ nullable: true })
  @IsBoolean()
  isVerified?: boolean;

  @Expose()
  @Field({ nullable: true })
  @IsString()
  userId?: string;

  @Expose()
  @Field({ nullable: true })
  @IsString()
  campaignId?: string;
}
