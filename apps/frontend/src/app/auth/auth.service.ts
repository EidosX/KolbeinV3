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
import {
  GetTwitchAuthCodeResDTO,
  TwitchAuthStatusResDTO,
} from '@interfaces/dto/twitch-auth.dto';

@Injectable()
export class AuthService {
  private readonly authSocket = io('ws://' + BACKEND_DOMAIN + '/auth');
  public readonly user$ = new BehaviorSubject<UserDocument | null>(null);
  public readonly code$ = new BehaviorSubject<string | null>(null);

  constructor() {
    this.authSocket.on('twitch auth status', (res: TwitchAuthStatusResDTO) => {
      if (res.status === 'Connected') {
        this.user$.next(res.user);
        this.code$.next(null);
        console.log(
          `Connected as ${res.user.displayName || res.user.twitchName}`
        );
      } else if (res.status === 'Timeout') {
        const currentCode = this.code$.getValue();
        if (res.code === currentCode) {
          this.code$.next(null);
          console.error(`Code ${currentCode} has expired`);
          // TODO: UI Alert
        }
      }
    });
  }

  public fetchCode() {
    this.authSocket.emit(
      'get twitch auth code',
      null,
      (res: GetTwitchAuthCodeResDTO) => {
        if (res.code) this.code$.next(res.code);
        else {
          const err: ErrorResDTO = (res as unknown) as ErrorResDTO;
          console.error(err);
          // TODO: UI Alert
        }
      }
    );
  }

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
