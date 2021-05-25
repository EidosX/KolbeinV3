import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { sessionSchema } from './session.schema';
import { SessionService } from './session.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Session', schema: sessionSchema }]),
  ],
  providers: [SessionService],
})
export class SessionModule {}
