import { Field, InputType } from "@nestjs/graphql";
import { Expose } from "class-transformer";
import { IsEmail, IsOptional, IsString } from "class-validator";

@InputType()
export class CreateWalletDto {
  @Expose()
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  campaignId?: string;

  @Expose()
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  currency?: string;

  @Expose()
  @Field()
  @IsEmail()
  userEmail: string;

  @Expose()
  @Field()
  @IsString() // TODO: does this decorator check empty string
  platform: string;
}
