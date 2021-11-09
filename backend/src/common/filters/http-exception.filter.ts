import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnauthorizedException,
} from "@nestjs/common";
import { GqlArgumentsHost } from "@nestjs/graphql";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const { req } = gqlHost.getContext();

    if (!req.user || !req.raw.user) {
      return new UnauthorizedException("User not register");
    }
    return exception;
  }
}
