import {
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayDisconnect,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/AuthGuard';
import { ChatEvent } from '../events/ChatEvent';
import { IChatSocket } from '../entities/IChatSocket';
import { MessageService } from '../services/MessageService';
import { ICreateMessageData } from '../dto/ICreateMessageData';
import { ConnectionService } from '../services/ConnectionService';

@WebSocketGateway({
  path: '/chat',
  cors: { origin: '*' },
  transports: ['websocket', 'polling'],
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly messageService: MessageService,
    private readonly connectionService: ConnectionService,
  ) {}

  @WebSocketServer()
  server: Server;

  afterInit(): void {
    // в теории можно подключить проверку авторизации server.use
    console.log('server started');
  }

  // @UseGuards не работает для handleConnection (отсутствует контекст)
  handleConnection(@ConnectedSocket() client: IChatSocket): void {
    return this.connectionService.connect(client);
  }

  // @UseGuards не работает для handleDisconnect (отсутствует контекст)
  handleDisconnect(@ConnectedSocket() client: IChatSocket): void {
    return this.connectionService.disconnect(client);
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage(ChatEvent.CREATE_MESSAGE)
  handleCreateMessage(
    @MessageBody() body: ICreateMessageData,
    @ConnectedSocket() socket: IChatSocket,
  ): void {
    this.messageService.create(body, socket);
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage(ChatEvent.DELETE_MESSAGE)
  handleDeleteMessage(
    @MessageBody() body: ICreateMessageData,
    @ConnectedSocket() socket: IChatSocket,
  ): void {
    this.messageService.delete(body, socket);
  }
}
