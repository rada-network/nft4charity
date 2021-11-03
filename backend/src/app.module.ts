import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GraphqlService, TypeOrmService } from "./config";
import { DateScalar } from "./config/graphql/scalars";
import * as Resolvers from "./resolvers";
import { FileModule } from "./file.module";

@Module({
  imports: [
    FileModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRootAsync({
      useClass: GraphqlService,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ...Object.values(Resolvers), DateScalar],
})
export class AppModule {}
