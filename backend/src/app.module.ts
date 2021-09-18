import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { CampaignsModule } from "./campaigns/campaigns.module";

@Module({
  imports: [
    CampaignsModule,
    GraphQLModule.forRoot({
      typePaths: ["./**/*.gql"],
      installSubscriptionHandlers: true,
    }),
  ],
})
export class AppModule {}
