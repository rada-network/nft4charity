import { Field, InputType } from "@nestjs/graphql";
import { Expose } from "class-transformer";
import {
  IsBoolean,
  IsEthereumAddress,
  IsOptional,
  IsString,
} from "class-validator";

@InputType()
export class CreateWalletDto {
  @Expose()
  @Field()
  @IsEthereumAddress()
  address: string;

  @Expose()
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  currency?: string;

  @Expose()
  @Field()
  @IsString() // TODO: does this decorator check empty string
  platform: string;

  @Expose()
  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;

  @Expose()
  @Field()
  @IsString()
  userId: string;

  @Expose()
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  campaignId?: string;
}
