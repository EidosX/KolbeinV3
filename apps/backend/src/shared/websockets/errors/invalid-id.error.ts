import { WsException } from '@nestjs/websockets';

export class InvalidIdError extends WsException {
  name = 'InvalidIdError';

  constructor(id?: string) {
    super('invalid id' + (id ? `: ${id}` : ''));
  }
}
