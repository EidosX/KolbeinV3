import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import * as tmi from 'tmi.js';
import { TwitchChatMsg } from '@interfaces/twitch-chat-msg';

@Injectable()
export class TwitchBotService implements OnModuleInit {
  private readonly chatSubject$: Subject<TwitchChatMsg> = new Subject();
  public readonly chat$: Observable<TwitchChatMsg> = this.chatSubject$;

  public async say(channel: string, message: string) {
    await this.client.say(channel, message);
  }

  onModuleInit() {
    this.client.on('connected', () =>
      this.logger.log(`TwitchBot connected as ${this.client.getUsername()}`)
    );
    this.client.on('chat', (channel, userstate, message, self) => {
      if (self) return;
      this.chatSubject$.next({
        message,
        channel,
        messageId: userstate.id,
        user: {
          displayName: userstate['display-name'],
          username: userstate['username'],
          mod: userstate.mod,
          subscriber: userstate.subscriber,
          twitchId: userstate['user-id'],
          broadcaster: userstate.badges?.broadcaster === '1',
        },
      });
    });
    this.client.connect().catch(() => null);
  }

  private readonly options: tmi.Options = {
    options: {
      debug: false,
    },
    connection: {
      reconnect: true,
      secure: true,
      timeout: 5000,
    },
    identity: {
      username: process.env.TWITCHBOT_USERNAME,
      password: process.env.TWITCHBOT_PASSWORD,
    },
    channels: [process.env.TWITCHBOT_DEFAULT_CHANNEL || 'kolb3in'],
    logger: {
      info: (msg) => this.options.options.debug && Logger.debug(msg),
      warn: (msg) => Logger.warn(msg),
      error: (msg) => Logger.error(msg),
    },
  };
  private readonly client: tmi.Client = tmi.client(this.options);
  private readonly logger: Logger = new Logger(TwitchBotService.name);
}
