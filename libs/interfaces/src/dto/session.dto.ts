import { UserDocument } from '@interfaces/user';

export interface RegisterSessionInputDTO {
  sessionClientString: string | null;
}
export type RegisterSessionResDTO =
  | {
      status: 'Connected';
      user: UserDocument;
    }
  | {
      status: 'Disconnected';
      sessionClientString?: string;
    };
