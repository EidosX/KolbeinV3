import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorResDTO, ResDTO } from '@interfaces/dto/common.dto';
import { InvalidIdError } from './errors/invalid-id.error';

@Injectable()
export class WsResFormatterInterceptor<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>
  ): Observable<ResDTO<T> | ErrorResDTO> {
    return next.handle().pipe(
      map((r) => ({
        status: 'Ok',
        ...(typeof r === 'object' ? r : { value: r }),
      })),
      catchError((err) => {
        if (err?.name === 'CastError') err = new InvalidIdError(err?.value);
        return err instanceof WsException
          ? of({ status: err.name, message: err.message })
          : throwError(err);
      })
    );
  }
}
