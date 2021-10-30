import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

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

  @Field(() => CreateWalletWithUserDto)
  wallet: CreateWalletWithUserDto;
}
