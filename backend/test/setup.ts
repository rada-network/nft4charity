import { exit } from "process";
import { exec } from "child_process";
import { promisify } from "util";
import { config } from "dotenv";
import { ok } from "assert";

// MONGODB_TESTING_URL=mongodb://localhost:27017/nft4charity-testing?retryWrites=true&w=majority
const execAsync = promisify(exec);
config();

ok(process.env.TEST_PORT);
const TEST_PORT = process.env.TEST_PORT;
const CONTAINER_NAME = `nft4charity-testing-db-${TEST_PORT}`;

const dockerRunCmd = `docker run -d --rm -p ${TEST_PORT}:27017 --name ${CONTAINER_NAME} mongo:latest`;
const dockerStopCmd = `docker stop ${CONTAINER_NAME}`;

const setup = async () => {
  try {
    console.log(dockerRunCmd);
    await execAsync(dockerRunCmd);
  } catch (error) {
    console.log(error);
    exit(1);
  }
};

const tearDown = async () => {
  try {
    console.log(dockerStopCmd);
    await execAsync(dockerStopCmd);
  } catch (error) {
    console.log(error);
    exit(1);
  }
};

beforeAll(async () => {
  await setup();
});

afterAll(async () => {
  await tearDown();
});
