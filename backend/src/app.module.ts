import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { join } from "path";
import { CampaignsModule } from "./campaigns/campaigns.module";

@Module({
  imports: [
    CampaignsModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      // autoSchemaFile: join(process.cwd(), "src/schema.gql"), // uncomment this to generate schema file
      // typePaths: ["./**/*.gql"],
      installSubscriptionHandlers: true,
    }),
    MongooseModule.forRoot(`${process.env.MONGODB_URL}`),
  ],
})
export class AppModule {}
