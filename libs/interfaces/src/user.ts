import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Rank, ranks } from '@interfaces/rank';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  twitchId!: string;

  @Prop({ required: true })
  twitchName!: string;

  @Prop()
  displayName?: string;

  @Prop({ type: String, enum: ranks, required: true, default: 'user' })
  rank!: Rank;

  @Prop({ type: Map, of: String })
  socials?: Map<string, string>;
}

export type UserDocument = User & Document;
export const userSchema = SchemaFactory.createForClass(User);
