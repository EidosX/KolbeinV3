import { WsException } from '@nestjs/websockets';
import { of, throwError } from 'rxjs';
import { WsResFormatterInterceptor } from './res-formatter.interceptor';

const callHandler = {
  handle: jest.fn(),
};

const dataFormatInterceptor = new WsResFormatterInterceptor();

describe('WsResponseFormatInterceptor', () => {
  it('transforms a return value', async () => {
    callHandler.handle.mockReturnValue(of({ data: 'blabla', more: 1 }));
    const actualValue = await dataFormatInterceptor
      .intercept(null, callHandler)
      .toPromise();
    expect(actualValue).toEqual({ status: 'Ok', data: 'blabla', more: 1 });
  });
  it("doesn't spread primitives", async () => {
    callHandler.handle.mockReturnValue(of('a string'));
    const actualValue = await dataFormatInterceptor
      .intercept(null, callHandler)
      .toPromise();
    expect(actualValue).toEqual({ status: 'Ok', value: 'a string' });
  });
  it("doesn't set status if overriden", async () => {
    callHandler.handle.mockReturnValue(
      of({ data: 'blabla', status: 'Waiting' })
    );
    const actualValue = await dataFormatInterceptor
      .intercept(null, callHandler)
      .toPromise();
    expect(actualValue).toEqual({ status: 'Waiting', data: 'blabla' });
  });
  it('transforms an error value', async () => {
    callHandler.handle.mockReturnValue(
      throwError(new WsException('oh shoot!'))
    );
    const actualValue = await dataFormatInterceptor
      .intercept(null, callHandler)
      .toPromise();
    expect(actualValue).toMatchObject({
      status: 'Error',
      message: 'oh shoot!',
    });
  });
});
