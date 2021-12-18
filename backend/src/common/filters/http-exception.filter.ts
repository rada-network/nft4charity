import { Catch, ExceptionFilter } from "@nestjs/common";
import { fileLogger } from "../../config";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  async catch(exception: unknown) {
    fileLogger.error(exception);

    return exception;
  }
}
