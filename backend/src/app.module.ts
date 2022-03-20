import { Module, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { GraphQLModule } from "@nestjs/graphql";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FastifyMulterModule } from "fastify-file-interceptor";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AllExceptionsFilter } from "./common";
import { GraphqlService, MulterConfigService, TypeOrmService } from "./config";
import { DateScalar } from "./config/graphql/scalars";
import { MAIL_JWT_SECRET } from "./environments";
import * as Resolvers from "./resolvers";
import { FileModule, MailModule } from "./services";

@Module({
  imports: [
    ConfigModule.forRoot(),
    FileModule,
    MailModule,
    JwtModule.register({ secret: MAIL_JWT_SECRET }),
    GraphQLModule.forRootAsync({ useClass: GraphqlService }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmService }),
    FastifyMulterModule.registerAsync({ useClass: MulterConfigService }),
  ],
  controllers: [AppController],
  providers: [
    ...Object.values(Resolvers),
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_PIPE, useClass: ValidationPipe },
    AppService,
    DateScalar,
  ],
})
export class AppModule {}
