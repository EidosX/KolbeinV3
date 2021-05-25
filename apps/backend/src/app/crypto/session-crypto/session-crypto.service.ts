import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class SessionCryptoService {
  public static get ID_LENGTH(): number {
    return 32; // Needs to be a multiple of 4
  }

  public generateId(): string {
    return crypto
      .randomBytes((SessionCryptoService.ID_LENGTH * 3) / 4)
      .toString('base64');
  }

  public generateClientString(id: string): string {
    const signature = this.sign(id);
    return `s.${id}.${signature}`;
  }

  // Returns id or null if input is invalid
  public verifyClientStringAndGetId(clientString: string): string {
    const [s, id, signature] = clientString.split('.');
    if (s !== 's') return null;
    if (!id || id.length !== SessionCryptoService.ID_LENGTH) return null;
    if (!signature) return null;
    if (this.sign(id) !== signature) return null;
    return id;
  }

  sign = (id: string): string =>
    crypto
      .createHmac('sha256', process.env.CRYPTO_SECRET)
      .update(id)
      .digest('base64');
}
