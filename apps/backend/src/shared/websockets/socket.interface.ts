import { Socket as NativeSocket } from 'socket.io';

/* Warning: all attributes MUST be optional (?:) */
export type SocketCustomData = {
  sessionId?: string;
};

export type Socket = NativeSocket & { client: SocketCustomData };
