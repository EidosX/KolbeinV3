import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class WsResponseFormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((r) => ({
        status: 'Ok',
        ...(typeof r === 'object' ? r : { value: r }),
      })),
      catchError((err) =>
        err instanceof WsException
          ? of({ status: err.name, message: err.message })
          : throwError(err)
      )
    );
  }
}
