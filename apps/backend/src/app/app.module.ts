import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { TwitchBotModule } from './twitch-bot/twitch-bot.module';
import { AuthModule } from './auth/auth.module';
import { CryptoModule } from './crypto/crypto.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING),
    UserModule,
    TwitchBotModule,
    CryptoModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
