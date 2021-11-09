import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RolesGuard } from "./common";
import { GraphqlService, TypeOrmService } from "./config";
import { DateScalar } from "./config/graphql/scalars";
import { FileModule } from "./file.module";
import * as Resolvers from "./resolvers";

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
  providers: [
    AppService,
    ...Object.values(Resolvers),
    DateScalar,
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
