import { resolve } from "path";
import { Injectable } from "@nestjs/common";
import { GqlModuleOptions, GqlOptionsFactory } from "@nestjs/graphql";

@Injectable()
export class GraphqlService implements GqlOptionsFactory {
  async createGqlOptions(): Promise<GqlModuleOptions> {
    return {
      // typePaths: ["./**/*.gql"],
      // autoSchemaFile: true,
      autoSchemaFile: resolve(process.cwd(), "src/schema.gql"),
      installSubscriptionHandlers: true,
    };
  }
}
