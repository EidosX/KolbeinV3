import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserDocument } from './user';

@Schema()
export class Participation {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], required: true })
  authors!: UserDocument[];

  @Prop({ required: true })
  audioLink!: string;
}
export type ParticipationDocument = Participation & Document;
const participationSchema = SchemaFactory.createForClass(Participation);

@Schema()
export class Vote {
  @Prop({
    required: true,
    default: () => `Vote (${new Date().toLocaleString('fr-FR')})`,
  })
  title!: string;

  @Prop({ type: Date, required: true, default: Date.now })
  created!: Date;

  @Prop({ required: true, default: false })
  active!: boolean;

  @Prop({ required: true, default: false })
  publicResults!: boolean;

  @Prop({ type: [participationSchema], required: true, default: [] })
  participations!: ParticipationDocument[];

  @Prop({
    type: Map,
    of: { type: Types.ObjectId, ref: 'Participation' },
    required: true,
    default: new Map(),
  })
  entries!: Map<string, ParticipationDocument>; // Maps twitchID to Participation
}

export type VoteDocument = Vote & Document;
export const voteSchema = SchemaFactory.createForClass(Vote);
