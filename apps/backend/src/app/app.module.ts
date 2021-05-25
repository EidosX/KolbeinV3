import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { TwitchBotModule } from './twitch-bot/twitch-bot.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING),
    UserModule,
    TwitchBotModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
