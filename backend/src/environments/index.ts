import * as dotenv from "dotenv";
dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL || "";

const REST_BASE_ROUTE = "/rest";

export { MONGODB_URL, REST_BASE_ROUTE };
