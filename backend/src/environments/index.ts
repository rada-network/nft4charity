import { ok } from "assert";
import * as dotenv from "dotenv";
dotenv.config();

const BASE_URL = process.env.BASE_URL || "localhost";

ok(process.env.NODE_ENV === "test" ? process.env.TEST_PORT : true);

const MONGODB_URL =
  process.env.NODE_ENV === "test"
    ? `mongodb://localhost:${process.env.TEST_PORT}/nft4charity-testing?retryWrites=true&w=majority`
    : process.env.MONGODB_URL || "";

const NODE_ENV = process.env.NODE_ENV || "development";

const PORT: number = +process.env.PORT || 8080;

const REST_BASE_ROUTE = "/rest";

const SENTRY_DSN = process.env.SENTRY_DSN || "";

export { BASE_URL, MONGODB_URL, NODE_ENV, PORT, REST_BASE_ROUTE, SENTRY_DSN };
