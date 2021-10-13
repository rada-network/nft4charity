import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { GraphQLSchemaHost } from "@nestjs/graphql";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { SwaggerModule } from "@nestjs/swagger";
import * as Sentry from "@sentry/node";
import { json, urlencoded } from "body-parser";
import { OpenAPI, useSofa } from "sofa-api";
import { AppModule } from "./app.module";
import { SentryInterceptor } from "./common";
import { BASE_URL, PORT, REST_BASE_ROUTE, SENTRY_DSN } from "./environments";

const baseRouteRest = REST_BASE_ROUTE;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalPipes(new ValidationPipe());

  app.use(/^\/rest\/(.*)\/?$/i, urlencoded({ extended: true }));
  app.use(/^\/rest\/(.*)\/?$/i, json());

  Sentry.init({ dsn: SENTRY_DSN });

  app.useGlobalInterceptors(new SentryInterceptor());

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
}
bootstrap();
