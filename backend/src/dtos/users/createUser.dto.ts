import { Field, InputType } from "@nestjs/graphql";
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from "class-validator";

@InputType()
export class CreateWalletWithUserDto {
  @Field({ description: "Network of the wallet" })
  @IsString()
  @IsNotEmpty()
  platform: string;

  @Field({ nullable: true, defaultValue: "" })
  @IsOptional()
  currency?: string;
}

@InputType()
export class ImageDto {
  @Field()
  @IsUrl()
  url: string;
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;
}
@InputType()
export class CreateUserDto {
  @Field()
  @IsString()
  firstName: string;

  @Field()
  @IsString()
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsUrl()
  youtubeUrl?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsUrl()
  facebookUrl?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsUrl()
  instagramUrl?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsUrl()
  twitterUrl?: string;

  @Field(() => [ImageDto], { nullable: true })
  @IsArray()
  @IsOptional()
  images?: ImageDto[];

  @Field(() => CreateWalletWithUserDto)
  wallet: CreateWalletWithUserDto;
}
