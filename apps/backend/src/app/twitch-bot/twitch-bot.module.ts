import { Module } from '@nestjs/common';
import { TwitchBotService } from './twitch-bot.service';

@Module({
  providers: [TwitchBotService],
})
export class TwitchBotModule {}
