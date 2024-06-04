import { Injectable } from '@nestjs/common';
import { ChatEvent } from '../events/ChatEvent';
import { IChatSocket } from '../entities/IChatSocket';
import { resolveAuthorization } from '../resolvers/resolveAuthorization';

@Injectable()
export class ConnectionService {
  public connect(client: IChatSocket): void {
    const { user, room } = resolveAuthorization(client.handshake.auth);
    client.join(room);
    client.broadcast.to(room).emit(ChatEvent.CONNECTED, { user });
  }

  public disconnect(client: IChatSocket): void {
    const { user, room } = resolveAuthorization(client.handshake.auth);
    client
      .timeout(5000)
      .broadcast.to(room)
      .emit(ChatEvent.DISCONNECTED, { user });
  }
}
