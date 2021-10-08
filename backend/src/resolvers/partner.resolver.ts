import { Query, Resolver } from "@nestjs/graphql";
import { getMongoRepository } from "typeorm";
import { Partner } from "../entities";

@Resolver(() => Partner)
export class PartnerResolver {
  @Query(() => [Partner])
  async partners(): Promise<Partner[]> {
    return getMongoRepository(Partner).find({
      where: {
        isActive: { $eq: true },
      },
      order: {
        sequence: "ASC",
      },
    });
  }
}
