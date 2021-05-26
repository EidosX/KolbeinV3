import { UserDocument } from '@interfaces/user';

export interface GetTwitchAuthCodeResDTO {
  code: string; // 4 letters code
}

export type TwitchAuthStatusResDTO =
  | {
      status: 'Connected';
      user: UserDocument;
    }
  | {
      status: 'Timeout';
      code: string;
    };
