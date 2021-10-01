import { Field, InputType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class CreateUserDto {
  @Field()
  @IsString()
  name: string;
}
