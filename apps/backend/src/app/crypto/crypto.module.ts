import { Module, OnModuleInit } from '@nestjs/common';
import { TwitchAuthCryptoService } from './twitch-auth/twitch-auth-crypto.service';
import { SessionCryptoService } from './session-crypto/session-crypto.service';

@Module({
  providers: [TwitchAuthCryptoService, SessionCryptoService],
  exports: [TwitchAuthCryptoService, SessionCryptoService],
})
export class CryptoModule implements OnModuleInit {
  onModuleInit() {
    if (!process.env.CRYPTO_SECRET)
      throw new Error('Crypto secret not set in environment variables!');
    if (process.env.CRYPTO_SECRET.length < 16)
      throw new Error('Crypto secret not long enough!');
  }
}
