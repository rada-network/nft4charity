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
import { REST_BASE_ROUTE } from "./environments";

const baseRouteRest = REST_BASE_ROUTE;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.useGlobalPipes(new ValidationPipe());
  app.use(/^\/rest\/(.*)\/?$/i, urlencoded({ extended: true }));
  app.use(/^\/rest\/(.*)\/?$/i, json());

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
        url: `http://localhost:8080`,
      },
    ],
  });

  app.use(
    baseRouteRest,
    useSofa({
      basePath: baseRouteRest,
      schema,
      onRoute(info) {
        openApi.addRoute(info, {
          basePath: baseRouteRest,
        });
      },
    }),
  );

  const openApiDoc = openApi.get();
  SwaggerModule.setup("apidocs", app, openApiDoc);

  await app.listen(8080, "0.0.0.0");
}
bootstrap();
