import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { sessionSchema } from './session.schema';
import { SessionService } from './session.service';
import { SessionGateway } from './session.gateway';
import { CryptoModule } from '../../crypto/crypto.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Session', schema: sessionSchema }]),
    CryptoModule,
  ],
  providers: [SessionService, SessionGateway],
  exports: [SessionService],
})
export class SessionModule {}
