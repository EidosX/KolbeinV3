import { UserDocument } from '@interfaces/user';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Session {
  @Prop({ type: Date, required: true, expires: 0 })
  expiration: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: UserDocument;

  @Prop({ required: true, unique: true })
  sessionId: string;
}

export type SessionDocument = Session & Document;
export const sessionSchema = SchemaFactory.createForClass(Session);
