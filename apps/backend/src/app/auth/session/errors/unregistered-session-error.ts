import { WsException } from '@nestjs/websockets';

export class UnregisteredSessionError extends WsException {
  name = 'UnregisteredSessionError';

  constructor() {
    super('No session id was registered');
  }
}
