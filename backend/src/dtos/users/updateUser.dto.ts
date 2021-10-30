import { InputType, OmitType, PartialType } from "@nestjs/graphql";
import { CreateUserDto } from "./createUser.dto";

@InputType()
export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ["wallet"] as const),
) {}
