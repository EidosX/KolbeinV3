import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { BACKEND_DOMAIN } from '../../shared/globals';
import {
  RegisterSessionInputDTO,
  RegisterSessionResDTO,
} from '@interfaces/dto/session.dto';
import { BehaviorSubject } from 'rxjs';
import { UserDocument } from '@interfaces/user';
import { ErrorResDTO } from '@interfaces/dto/common.dto';

@Injectable()
export class AuthService {
  private readonly authSocket = io('ws://' + BACKEND_DOMAIN + '/auth');
  public readonly user$ = new BehaviorSubject<UserDocument | null>(null);

  /*
   * Should only be called once at application start!
   */
  public registerSession() {
    const input: RegisterSessionInputDTO = {
      sessionClientString: localStorage.getItem('sessionClientString'),
    };
    this.authSocket.emit(
      'register session',
      input,
      (res: RegisterSessionResDTO) => {
        if (res.status === 'Connected') {
          this.user$.next(res.user);
        } else if (res.status === 'Disconnected') {
          const sessionClientStr = res.sessionClientString;
          if (sessionClientStr)
            localStorage.setItem('sessionClientString', sessionClientStr);
        } else {
          const err: ErrorResDTO = res;
          console.error(err);
          // TODO: UI Alert
        }
        console.log('Session registration: ' + res.status);
      }
    );
  }
}
