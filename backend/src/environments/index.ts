import * as dotenv from "dotenv";
dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL || "";

const BASE_URL = process.env.BASE_URL || "localhost";
const PORT: number = +process.env.PORT || 8080;

const REST_BASE_ROUTE = "/rest";

export { BASE_URL, MONGODB_URL, PORT, REST_BASE_ROUTE };
