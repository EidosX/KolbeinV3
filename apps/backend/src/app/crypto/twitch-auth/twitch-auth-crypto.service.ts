import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class TwitchAuthCryptoService {
  public generateCode(): string {
    let str = '';
    for (let i = 0; i < 4; ++i) {
      const x = crypto.randomInt(0, 36);
      if (x < 26) str += String.fromCharCode(65 + x);
      else str += (x - 26).toString();
    }
    return str;
  }
}
