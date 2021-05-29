import { WsException } from '@nestjs/websockets';

export class UserNotFoundError extends WsException {
  name = 'UserNotFoundError';

  constructor() {
    super('User not found');
  }
}
