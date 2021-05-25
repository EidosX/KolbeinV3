import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as tmi from 'tmi.js';

@Injectable()
export class TwitchBotService implements OnModuleInit {
  public async say(channel: string, message: string) {
    await this.client.say(channel, message);
  }

  async onModuleInit() {
    this.client.on('connected', () =>
      this.logger.log(`TwitchBot connected as ${this.client.getUsername()}`)
    );
    await this.client.connect().catch(() => null);
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
