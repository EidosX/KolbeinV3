import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsException,
} from '@nestjs/websockets';
import { GetUserInputDTO, GetUserResDTO } from '@interfaces/dto/user.dto';
import { UserService } from './user.service';
import { UserNotFoundError } from './errors/user-not-found.error';
import { UseInterceptors } from '@nestjs/common';
import { WsResFormatterInterceptor } from '../../shared/websockets/res-formatter.interceptor';

@WebSocketGateway({ namespace: 'users' })
@UseInterceptors(WsResFormatterInterceptor)
export class UserGateway {
  constructor(private readonly userService: UserService) {}

  @SubscribeMessage('get')
  async handleMessage(
    @MessageBody() data: GetUserInputDTO
  ): Promise<GetUserResDTO> {
    if (!data.userId) throw new WsException('No user ID provided');
    const user = await this.userService.getById(data.userId);
    if (!user) throw new UserNotFoundError();
    return {
      user: {
        rank: user.rank,
        twitchName: user.twitchName,
        displayName: user.displayName,
        socials: (user.socials as unknown) as Record<string, string>,
        description: user.description,
        voteThanksMsg: user.voteThanksMsg,
      },
    };
  }
}
