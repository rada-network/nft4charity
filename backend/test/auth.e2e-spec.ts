import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { config as dotenvConfig } from "dotenv";
import { ethers as Ethers } from "ethers";
import * as request from "supertest";
import { getConnection } from "typeorm";
import { authMiddleware } from "../src/common";
import { AppModule } from "../src/app.module";

// eslint-disable-next-line
const Web3Token = require("web3-token");

dotenvConfig();
const gqlEndpoint = "graphql";

const mnemonic_instance = Ethers.Wallet.fromMnemonic(
  process.env["ACCOUNT_MNEMONIC"],
);
const ethers_provider = new Ethers.providers.JsonRpcProvider(
  process.env["CHAIN_PROVIDER_URL"],
);

const ethers_signer = new Ethers.Wallet(
  mnemonic_instance.privateKey,
  ethers_provider,
);

const expectError = (response: request.Response, errorMsg: string) => {
  expect(Array.isArray(response.body.errors)).toBeTruthy();
  expect(response.body.errors.length).toBeGreaterThan(0);

  const msg = response.body.errors[0].message;
  expect(msg).toEqual(errorMsg);
};

describe("Authentication (e2e)", () => {
  let app: INestApplication;
  const requestBody = {
    operationName: null,
    variables: {},
    query: "{ me { _id firstName lastName email roles createdAt updatedAt } }",
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(authMiddleware);
    await app.init();
  });

  test("should throw 'Token required' error when no header provided", async () => {
    const res = await request(app.getHttpServer())
      .post(`/${gqlEndpoint}`)
      .send(requestBody);

    expectError(res, "Token required");
  });

  test("should throw 'User not register' error when user not register", async () => {
    const token = await Web3Token.sign(
      (body) => ethers_signer.signMessage(body),
      "5m",
    );

    const res = await request(app.getHttpServer())
      .post(`/${gqlEndpoint}`)
      .set("Authorization", token)
      .send(requestBody);

    expectError(res, "User not register");
  });

  test("should throw 'Token expired' error when using expired token", async () => {
    const token = await Web3Token.sign(
      (body) => ethers_signer.signMessage(body),
      "-3s",
    );

    const res = await request(app.getHttpServer())
      .post(`/${gqlEndpoint}`)
      .set("Authorization", token)
      .send(requestBody);

    expectError(res, "Token expired");
  });

  test("should throw 'Invalid token' error when malicious token provied", async () => {
    const token = "abc";

    const res = await request(app.getHttpServer())
      .post(`/${gqlEndpoint}`)
      .set("Authorization", token)
      .send(requestBody);

    expectError(res, "Invalid token");
  });

  afterAll(async () => {
    await getConnection().close();
    await app.close();
  });
});
