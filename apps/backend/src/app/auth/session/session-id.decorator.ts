import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Socket } from '../../../shared/websockets/socket.interface';
import { UnregisteredSessionError } from './errors/unregistered-session-error';

export const SessionId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const socket: Socket = ctx.switchToWs().getClient();
    const sessionId: string = socket.client.sessionId;
    if (!sessionId) throw new UnregisteredSessionError();
    return sessionId;
  }
);
