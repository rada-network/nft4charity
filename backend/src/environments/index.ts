import { ok } from "assert";
import * as dotenv from "dotenv";
dotenv.config();

// Assert requrie variables in specific environment
const IS_PRODUCTION = process.env.NODE_ENV === "production";
const IS_TEST = process.env.NODE_ENV === "test";

ok(IS_PRODUCTION ? process.env.MAIL_JWT_SECRET : true);
ok(IS_PRODUCTION ? process.env.MAIL_VERIFICATION_URL : true);
ok(IS_PRODUCTION ? process.env.MAIL_CHANGE_URL : true);

ok(IS_TEST ? process.env.TEST_PORT : process.env.MONGODB_URL);

ok(
  process.env.MAIL_RESEND_VERIFICATION_TIME_MINUTE
    ? !isNaN(+process.env.MAIL_RESEND_VERIFICATION_TIME_MINUTE)
    : true,
);

ok(process.env.SENDGRID_API_KEY);

// Mics
const MONGODB_TESTING_URL = `mongodb://localhost:${process.env.TEST_PORT}/nft4charity-testing?retryWrites=true&w=majority`;

// Define global environment variables
const BASE_URL = process.env.BASE_URL || "localhost";

const MAIL_CHANGE__URL =
  process.env.MAIL_CHANGE__URL || "http://localhost:8080/change-mail";

const MAIL_EXPIRE_TIME = process.env.MAIL_EXPIRE_TIME || "1m";
const MAIL_JWT_SECRET = process.env.MAIL_JWT_SECRET || "SOME_STRONG_SECRET";

const MAIL_RESEND_VERIFICATION_TIME_MINUTE =
  +process.env.MAIL_RESEND_VERIFICATION_TIME_MINUTE || 3;

const MAIL_SENDER_EMAIL = process.env.MAIL_SENDER_EMAIL || "noreply@gmail.com";
const MAIL_SENDER_NAME = process.env.MAIL_SENDER_NAME || "NFT4Charity Team";

const MAIL_VERIFICATION_URL =
  process.env.MAIL_VERIFICATION_URL || "http://localhost:8080/verify-mail";

const MONGODB_URL = IS_TEST ? MONGODB_TESTING_URL : process.env.MONGODB_URL;

const NODE_ENV = process.env.NODE_ENV || "development";

const PORT: number = +process.env.PORT || 8080;

const PROJECT_ADDRESS = process.env.PROJECT_ADDRESS || "On no where";
const PROJECT_COLOR = process.env.PROJECT_COLOR || "#101826";
const PROJECT_LOGO_URL =
  process.env.PROJECT_LOGO_URL ||
  "https://nft4charity-assets.s3.us-east-2.amazonaws.com/PNG/NFT4charity+Signature+label+white.png";
const PROJECT_NAME = process.env.PROJECT_NAME || "NFT4Charity";
const PROJECT_SLOGAN =
  process.env.PROJECT_SLOGAN || "Made with ❤️ by hard working people";

const REST_BASE_ROUTE = "/rest";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

const SENTRY_DSN = process.env.SENTRY_DSN || "";

export {
  BASE_URL,
  MAIL_CHANGE__URL,
  MAIL_EXPIRE_TIME,
  MAIL_JWT_SECRET,
  MAIL_RESEND_VERIFICATION_TIME_MINUTE,
  MAIL_SENDER_EMAIL,
  MAIL_SENDER_NAME,
  MAIL_VERIFICATION_URL,
  MONGODB_URL,
  NODE_ENV,
  PORT,
  PROJECT_ADDRESS,
  PROJECT_COLOR,
  PROJECT_LOGO_URL,
  PROJECT_NAME,
  PROJECT_SLOGAN,
  REST_BASE_ROUTE,
  SENDGRID_API_KEY,
  SENTRY_DSN,
};
