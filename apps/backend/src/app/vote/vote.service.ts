import { UserDocument } from '@interfaces/user';
import { Participation, VoteDocument } from '@interfaces/vote';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class VoteService {
  constructor(
    @InjectModel('Vote') private readonly voteModel: Model<VoteDocument>
  ) {}

  public async create(title: string): Promise<VoteDocument> {
    return this.voteModel.create({ title: title || undefined });
  }

  public async addParticipation(
    voteId: string,
    author: UserDocument,
    audioLink: string
  ): Promise<VoteDocument> {
    const vote = await this.voteModel.findById(voteId).exec();
    if (!vote) throw new Error('Vote not found');
    ((vote.participations as unknown) as Participation[]).push({
      authors: [author],
      audioLink,
    });
    return await vote.save();
  }

  // Can throw error!
  public async putVoteEntry(
    voteId: string,
    fromTwitchID: string,
    participationID: string
  ): Promise<void> {
    const vote = await this.voteModel.findById(voteId).exec();
    if (!vote) throw new Error('Vote not found');
    for (const participation of vote.participations) {
      if (participation.id !== participationID) continue;
      vote.entries.set(fromTwitchID, participation);
      vote.save();
      return;
    }
    throw new Error('Vote does not contain participation');
  }
}
