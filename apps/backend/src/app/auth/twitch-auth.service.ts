import { TwitchChatMsg } from '@interfaces/twitch-chat-msg';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { filter } from 'rxjs/operators';
import { Socket } from '../../shared/websockets/socket.interface';
import { TwitchAuthCryptoService } from '../crypto/twitch-auth/twitch-auth-crypto.service';
import { TwitchBotService } from '../twitch-bot/twitch-bot.service';

@Injectable()
export class TwitchAuthService implements OnModuleInit {
  constructor(
    private readonly twitchAuthCryptoService: TwitchAuthCryptoService,
    private readonly twitchBotService: TwitchBotService
  ) {}
  onModuleInit() {
    /* Expired codes removal */

    setInterval(() => {
      const currentTime = Date.now();
      for (const pending of this.pendingCodesMap.values()) {
        if (pending.expiration < currentTime) {
          this.pendingCodesMap.delete(pending.code);
          pending.onTimeout();
        }
      }
    }, 15000);

    /* Checking for codes in twitch chat */

    this.twitchBotService.chat$
      .pipe(filter((m) => m.message.length === 4))
      .subscribe((msg) => {
        const pendingCode = this.pendingCodesMap.get(msg.message.toUpperCase());
        if (pendingCode) {
          this.pendingCodesMap.delete(pendingCode.code);
          pendingCode.onIdentification(msg);
        }
      });
  }

  /*
   * All pending codes MUST be 4 characters long and uppercase!
   */
  public addPendingCode(
    code: string,
    onIdentification: (msg: TwitchChatMsg) => void,
    options?: { socket?: Socket; codeTTL?: number; onTimeout?: () => void }
  ) {
    const expiration = Date.now() + (options?.codeTTL ?? defaultCodeTTL);
    this.pendingCodesMap.set(code, {
      code,
      socket: options?.socket,
      onIdentification,
      expiration,
      onTimeout: options?.onTimeout,
    });
  }

  public findCodeBySessionID(sessionId: string): string {
    if (!sessionId) return null;
    for (const { code, socket } of this.pendingCodesMap.values())
      if (socket?.client.sessionId === sessionId) return code;
    return null;
  }

  public codeAlreadyExists(code: string): boolean {
    return this.pendingCodesMap.has(code);
  }

  public getAllPendingCodes(): IterableIterator<PendingCode> {
    return this.pendingCodesMap.values();
  }

  public generateCodeRetryIfAlreadyExists(): string {
    let code: string;
    do {
      code = this.twitchAuthCryptoService.generateCode();
    } while (this.codeAlreadyExists(code));
    return code;
  }

  private readonly pendingCodesMap: Map<string, PendingCode> = new Map();
}

const defaultCodeTTL: number =
  parseInt(process.env.TWITCH_AUTH_CODE_TTL) || 120000;
interface PendingCode {
  code: string;
  expiration: number; // timestamp
  socket?: Socket;
  onIdentification: (TwitchChatMsg) => void;
  onTimeout?: () => void;
}
