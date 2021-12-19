import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { getConnection } from "typeorm";
import { AppModule } from "../src/app.module";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/ (GET)", async () => {
    try {
      await request(app.getHttpServer())
        .get("/")
        .expect(200)
        .expect("Hello World!");
    } catch (err) {
      console.log(err);
    }
  });

  afterEach(async () => {
    await getConnection().close();
    await app.close();
  });
});
