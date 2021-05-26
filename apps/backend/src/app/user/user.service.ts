import { UserDocument } from '@interfaces/user';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>
  ) {}

  public async getById(id: string): Promise<UserDocument> {
    return await this.userModel.findById(id).exec();
  }

  public async getByTwitchId(twitchId: string): Promise<UserDocument> {
    return await this.userModel.findOne({ twitchId }).exec();
  }

  public async create(twitchId: string, twitchName: string) {
    return await this.userModel.create({ twitchId, twitchName });
  }
}
