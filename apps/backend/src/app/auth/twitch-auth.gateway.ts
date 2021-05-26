import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from '../../shared/websockets/socket.interface';
import { SessionService } from './session/session.service';
import {
  GetTwitchAuthCodeResDTO,
  TwitchAuthStatusResDTO,
} from '@interfaces/dto/twitch-auth.dto';
import { SessionId } from './session/session-id.decorator';
import { UseInterceptors } from '@nestjs/common';
import { WsResFormatterInterceptor } from '../../shared/websockets/res-formatter.interceptor';
import { AlreadyConnectedError } from './errors/already-connected.error';
import { UserService } from '../user/user.service';
import { TwitchAuthService } from './twitch-auth.service';
import { TwitchChatMsg } from '@interfaces/twitch-chat-msg';

@WebSocketGateway({ namespace: 'auth' })
@UseInterceptors(WsResFormatterInterceptor)
export class TwitchAuthGateway {
  constructor(
    private readonly sessionService: SessionService,
    private readonly userService: UserService,
    private readonly twitchAuthService: TwitchAuthService
  ) {}

  /*
   * Sends a 4 letters code back.
   * If someone types this code in twitch chat, the socket is
   * authenticated to the corresponding user.
   * If the twitch typer has no corresponding user, it is created.
   *
   * Connection info is sent back via the "twitch auth status" route
   * (Essentially connected as user or timeout)
   */
  @SubscribeMessage('get twitch auth code')
  async twitchAuth(
    @ConnectedSocket() socket: Socket,
    @SessionId() sessionId: string
  ): Promise<GetTwitchAuthCodeResDTO> {
    const existingUser = await this.sessionService.getUser(sessionId);
    if (existingUser) throw new AlreadyConnectedError(existingUser.twitchName);

    const code: string =
      this.twitchAuthService.findCodeBySessionID(sessionId) ||
      this.twitchAuthService.generateCodeRetryIfAlreadyExists();

    // This function is called once someone types the code in the twitch tchat
    const onIdentification = async (msg: TwitchChatMsg) => {
      const user =
        (await this.userService.getByTwitchId(msg.user.twitchId)) ||
        (await this.userService.create(msg.user.twitchId, msg.user.username));
      await this.sessionService.newSession(sessionId, user);
      const response: TwitchAuthStatusResDTO = { status: 'Connected', user };
      socket.emit('twitch auth status', response);
    };
    // This function is called if nobody types the code.
    const onTimeout = () => {
      const response: TwitchAuthStatusResDTO = { status: 'Timeout', code };
      socket.emit('twitch auth status', response);
    };

    this.twitchAuthService.addPendingCode(code, onIdentification, {
      socket,
      onTimeout,
    });

    return { code };
  }
}
