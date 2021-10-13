import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import * as Sentry from "@sentry/minimal";
import { catchError, map, Observable, throwError } from "rxjs";

@Injectable()
export class SentryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((value) => {
        console.log(JSON.stringify(value));
        Sentry.captureMessage(JSON.stringify(value));
        return value === null ? "" : value;
      }),
      catchError((exception) => {
        Sentry.captureException(exception);
        return throwError(() => exception);
      }),
    );
  }
}
