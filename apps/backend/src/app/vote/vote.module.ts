import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VoteService } from './vote.service';
import { voteSchema } from '@interfaces/vote';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Vote', schema: voteSchema }])],
  providers: [VoteService],
})
export class VoteModule {}
