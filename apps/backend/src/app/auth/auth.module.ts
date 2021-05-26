import { Module } from '@nestjs/common';
import { CryptoModule } from '../crypto/crypto.module';
import { TwitchBotModule } from '../twitch-bot/twitch-bot.module';
import { UserModule } from '../user/user.module';
import { SessionModule } from './session/session.module';
import { TwitchAuthGateway } from './twitch-auth.gateway';
import { TwitchAuthService } from './twitch-auth.service';

@Module({
  imports: [SessionModule, CryptoModule, TwitchBotModule, UserModule],
  providers: [TwitchAuthGateway, TwitchAuthService],
})
export class AuthModule {}
