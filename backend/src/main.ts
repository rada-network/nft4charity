import { NestFactory } from "@nestjs/core";
import { GraphQLSchemaHost } from "@nestjs/graphql";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { json, urlencoded } from "body-parser";
import { OpenAPI, useSofa } from "sofa-api";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.listen(8080, "0.0.0.0");

  app.use(urlencoded({ extended: true }));
  app.use(json());
  const { schema } = app.get(GraphQLSchemaHost);
  const openApi = OpenAPI({
    schema,
    info: {
      title: "NFT4Charity API",
      version: "3.0.0",
    },
    servers: [
      {
        url: "http://localhost:8080/api",
      },
    ],
  });

  app.use(
    "/api",
    useSofa({
      basePath: "/api",
      schema,
      onRoute(info) {
        openApi.addRoute(info, {
          basePath: "/api",
        });
      },
    }),
  );
  openApi.save("src/swagger.yml");
}
bootstrap();
