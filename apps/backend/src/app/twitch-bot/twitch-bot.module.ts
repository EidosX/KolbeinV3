import { Module } from '@nestjs/common';
import { TwitchBotService } from './twitch-bot.service';

@Module({
  providers: [TwitchBotService],
  exports: [TwitchBotService],
})
export class TwitchBotModule {}
