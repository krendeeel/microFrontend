import io, { Socket } from 'socket.io-client';
import { ChatEvent } from './enums/ChatEvents';
import { IAuth } from '../../auth/IAuth';
import { ChatAction } from './enums/ChatAction';

import { ICreateMessageRequest } from './requests/ICreateMessageRequest';

type ChatSocket = Socket<ChatAction>;

export class ChatService {
  private socket: ChatSocket | null = null;

  constructor({ user, room }: IAuth) {
    this.socket = io('http://localhost:3003', {
      path: '/chat',
      autoConnect: false,
      auth: { user, room }
    });
  }

  public connect(addMessage: (message: string) => void) {
    this.assertSocket(this.socket);
    this.socket.connect();
    this.socket.on(ChatEvent.CONNECTED, ({ user: connectedUser }) => {
      const message = `${connectedUser} connected to room`;
      addMessage(message);
    });
    this.socket.on(ChatEvent.DISCONNECTED, ({ user: disconnectedUser }) => {
      const message = `${disconnectedUser} disconnected from room`;
      addMessage(message);
    });
    this.socket.on(ChatEvent.CREATE_MESSAGE, ({ message: createdMessage, user: author }) => {
      const message = `${author}: ${createdMessage}`;
      addMessage(message);
    });
    this.socket.on(ChatEvent.EXCEPTION, (error: Error) => {
      alert(error.message);
    });
    this.socket.on(ChatEvent.CONNECT_ERROR, (error) => {
      alert(error.message);
    });
  }

  public sendMessage(data: ICreateMessageRequest) {
    this.assertSocket(this.socket);
    this.socket.emit(ChatEvent.CREATE_MESSAGE, data);
  }

  public disconnect() {
    this.assertSocket(this.socket);
    this.socket.disconnect();
  }

  private assertSocket(socket: ChatSocket | null): asserts socket is ChatSocket {
    if (!socket) {
      throw new Error('Socket not found!');
    }
  }
}
