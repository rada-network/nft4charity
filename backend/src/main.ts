import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { GraphQLSchemaHost } from "@nestjs/graphql";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { SwaggerModule } from "@nestjs/swagger";
import { json, urlencoded } from "body-parser";
import { OpenAPI, useSofa } from "sofa-api";
import { AppModule } from "./app.module";
import { AllExceptionsFilter, authMiddleware } from "./common";
import { consoleLogger, httpConsoleLogger, httpFileLogger } from "./config";
import { BASE_URL, PORT, REST_BASE_ROUTE } from "./environments";
import * as cors from "cors";

const baseRouteRest = REST_BASE_ROUTE;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.use(httpFileLogger);
  app.use(httpConsoleLogger);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());

  app.use(/^\/rest\/(.*)\/?$/i, urlencoded({ extended: true }));
  app.use(/^\/rest\/(.*)\/?$/i, json());

  app.use(
    cors({
      origin: true,
    }),
  );
  app.use(authMiddleware);

  await app.init();

  const { schema } = app.get(GraphQLSchemaHost);
  const openApi = OpenAPI({
    schema,
    info: {
      title: "NFT4Charity API",
      version: "3.0.0",
    },
    servers: [
      {
        url: `http://localhost:${PORT}${baseRouteRest}`,
        description: "NFT4Charity API Development Server",
      },
      {
        url: `https://${BASE_URL}${baseRouteRest}`,
        description: "NFT4Charity API Production Server",
      },
    ],
  });

  app.use(
    baseRouteRest,
    useSofa({
      basePath: baseRouteRest,
      schema,
      onRoute(info) {
        openApi.addRoute(info);
      },
    }),
  );

  const openApiDoc = openApi.get();
  SwaggerModule.setup("apidocs", app, openApiDoc);

  await app.listen(PORT, "0.0.0.0");

  consoleLogger.info(`Application listening on port ${PORT}`);
}
bootstrap();
