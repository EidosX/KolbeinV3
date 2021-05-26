import { WsException } from '@nestjs/websockets';

export class AlreadyConnectedError extends WsException {
  name = 'AlreadyConnectedError';

  constructor(username?: string) {
    super('Already connected' + (username ? ` as ${username}` : ''));
  }
}
