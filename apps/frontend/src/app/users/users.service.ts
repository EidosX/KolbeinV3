import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { io } from 'socket.io-client';
import { BACKEND_DOMAIN } from '../../shared/globals';
import {
  GetUserInputDTO,
  GetUserResDTO,
  PublicUser,
} from '@interfaces/dto/user.dto';
import { ErrorResDTO, ResDTO } from '@interfaces/dto/common.dto';

@Injectable()
export class UsersService {
  private readonly usersSocket = io('ws://' + BACKEND_DOMAIN + '/users');
  public fetchUser(userId: string): ReplaySubject<PublicUser> {
    const observable = new ReplaySubject<PublicUser>(0);
    const input: GetUserInputDTO = { userId };

    this.usersSocket.emit('get', input, (user: ResDTO<GetUserResDTO>) => {
      if (user.status === 'Ok') {
        observable.next(user.user);
      } else {
        const err: ErrorResDTO = user;
        // TODO: idk what to do lol, maybe throw in observable
        console.error(err);
      }
      observable.complete();
    });
    return observable;
  }

  constructor() {
    this.fetchUser('60b20c3fbc9fca0b34940f73');
  }
}
