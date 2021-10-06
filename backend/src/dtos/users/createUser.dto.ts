import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsString } from "class-validator";

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

  @Field()
  @IsString()
  password: string;
}
