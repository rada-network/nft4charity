import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { CampaignsModule } from "./campaigns/campaigns.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    CampaignsModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      typePaths: ["./**/*.gql"],
      installSubscriptionHandlers: true,
    }),
    MongooseModule.forRoot(`${process.env.MONGODB_URL}`),
  ],
})
export class AppModule {}
