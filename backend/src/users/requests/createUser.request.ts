import { IsNotEmpty } from "class-validator";

export class CreateUserRequest {
  @IsNotEmpty({ message: "name is not empty" })
  name: string;
}
