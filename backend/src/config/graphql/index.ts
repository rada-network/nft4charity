import { Injectable } from "@nestjs/common";
import { GqlModuleOptions, GqlOptionsFactory } from "@nestjs/graphql";
import { resolve } from "path";

@Injectable()
export class GraphqlService implements GqlOptionsFactory {
  async createGqlOptions(): Promise<GqlModuleOptions> {
    return {
      autoSchemaFile: resolve(process.cwd(), "src/schema.gql"),
    };
  }
}
