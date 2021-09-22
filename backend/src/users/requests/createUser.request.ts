import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class CreateUserRequest {
  @Field()
  @IsNotEmpty({ message: "name is not empty" })
  name: string;
}
