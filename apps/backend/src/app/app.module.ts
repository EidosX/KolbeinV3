import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { TwitchBotModule } from './twitch-bot/twitch-bot.module';
import { SessionModule } from './auth/session/session.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING),
    UserModule,
    TwitchBotModule,
    SessionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
