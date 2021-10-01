import { Injectable } from "@nestjs/common";
import { GqlModuleOptions, GqlOptionsFactory } from "@nestjs/graphql";

@Injectable()
export class GraphqlService implements GqlOptionsFactory {
  async createGqlOptions(): Promise<GqlModuleOptions> {
    return {
      autoSchemaFile: true,
      // typePaths: ["./**/*.gql"],
      // autoSchemaFile: resolve(process.cwd(), "src/schema.gql"),
      installSubscriptionHandlers: true,
    };
  }
}
