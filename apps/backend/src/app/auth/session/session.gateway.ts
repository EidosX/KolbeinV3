import { UseInterceptors } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from '../../../shared/websockets/socket.interface';
import { WsResFormatterInterceptor } from '../../../shared/websockets/res-formatter.interceptor';
import { SessionCryptoService } from '../../crypto/session-crypto/session-crypto.service';
import {
  RegisterSessionInputDTO,
  RegisterSessionResDTO,
} from '@interfaces/dto/session.dto';
import { UserDocument } from '@interfaces/user';
import { SessionService } from './session.service';

@WebSocketGateway({ namespace: 'auth' })
@UseInterceptors(WsResFormatterInterceptor)
export class SessionGateway {
  constructor(
    private readonly sessionCryptoService: SessionCryptoService,
    private readonly sessionService: SessionService
  ) {}

  /*
   * Sends a new session client string if none is provided or if it is invalid.
   */
  @SubscribeMessage('register session')
  async registerSession(
    socket: Socket,
    data?: RegisterSessionInputDTO
  ): Promise<RegisterSessionResDTO> {
    const parsedSessionId: string =
      typeof data?.sessionClientString === 'string' &&
      this.sessionCryptoService.verifyClientStringAndGetId(
        data?.sessionClientString
      );

    if (parsedSessionId) {
      /* The user provided a valid session id */
      const user: UserDocument = await this.sessionService.getUser(
        parsedSessionId
      );

      socket.client.sessionId = parsedSessionId;
      return user ? { status: 'Connected', user } : { status: 'Disconnected' };
    } else {
      /* The user provided no or an invalid session id */
      const sessionId = this.sessionCryptoService.generateId();
      const sessionClientString = this.sessionCryptoService.generateClientString(
        sessionId
      );

      socket.client.sessionId = sessionId;
      return { status: 'Disconnected', sessionClientString };
    }
  }
}
