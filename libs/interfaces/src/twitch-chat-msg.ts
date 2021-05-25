export interface TwitchChatMsg {
  message: string;
  channel: string;
  messageId: string;
  user: {
    displayName: string;
    username: string;
    twitchId: string;
    mod: boolean;
    subscriber: boolean;
    broadcaster: boolean;
  };
}
