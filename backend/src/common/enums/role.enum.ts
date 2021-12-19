import { registerEnumType } from "@nestjs/graphql";

export enum Role {
  USER = "user",
  DONATOR = "donator",
  FUND_RAISER = "fundRaiser",
  DISTRIBUTOR = "distributor",
  ADMIN = "admin",
}

registerEnumType(Role, {
  name: "Role",
});
