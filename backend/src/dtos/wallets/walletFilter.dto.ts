import { Field, InputType } from "@nestjs/graphql";
import { Expose } from "class-transformer";
import {
  IsBoolean,
  IsEthereumAddress,
  IsOptional,
  IsString,
} from "class-validator";

@InputType()
export class WalletFilterDto {
  @Expose()
  @Field({ nullable: true })
  @IsEthereumAddress()
  @IsOptional()
  address?: string;

  @Expose()
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  currency?: string;

  @Expose()
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  platform?: string;

  @Expose()
  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;

  @Expose()
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  userId?: string;

  @Expose()
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  campaignId?: string;
}
