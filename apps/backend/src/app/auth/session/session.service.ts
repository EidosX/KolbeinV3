import { UserDocument } from '@interfaces/user';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SessionDocument } from './session.schema';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel('Session')
    private readonly sessionModel: Model<SessionDocument>
  ) {}

  public async newSession(
    sessionId: string,
    user: UserDocument
  ): Promise<SessionDocument> {
    await this.sessionModel.deleteOne({ sessionId }).exec();
    return await this.sessionModel.create({
      expiration: Date.now() + this.sessionTTL,
      user,
      sessionId,
    });
  }

  public async getUser(sessionId: string): Promise<UserDocument> {
    if (!sessionId) return null;
    return (
      await this.sessionModel.findOne({ sessionId }).populate('user').exec()
    )?.user;
  }

  private readonly sessionTTL = parseInt(process.env.SESSION_TTL) || 120000;
}
