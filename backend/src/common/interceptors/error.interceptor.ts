import { fileLogger } from "./../../config/logging/index";
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { catchError, map, Observable, throwError } from "rxjs";

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((value) => {
        fileLogger.info(
          JSON.stringify({
            data: value,
          }),
        );
        return value === null ? "" : value;
      }),
      catchError((exception) => {
        fileLogger.error(exception.stack || exception.message);
        return throwError(() => exception);
      }),
    );
  }
}
