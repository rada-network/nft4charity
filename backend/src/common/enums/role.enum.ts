import { registerEnumType } from "@nestjs/graphql";

export enum Role {
  USER = "user",
  DONATOR = "donator",
  FUND_RAISER = "fundRaiser",
  CONTRIBUTROR = "contributor",
  ADMIN = "admin",
}

registerEnumType(Role, {
  name: "Role",
});
