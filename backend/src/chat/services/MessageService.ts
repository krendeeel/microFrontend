import { Injectable } from '@nestjs/common';
import { ChatEvent } from '../events/ChatEvent';
import { IChatSocket } from '../entities/IChatSocket';
import { ICreateMessageData } from '../dto/ICreateMessageData';

@Injectable()
export class MessageService {
  public create(body: ICreateMessageData, client: IChatSocket): void {
    client.broadcast.to(body.room).emit(ChatEvent.CREATE_MESSAGE, body);
  }

  public delete(body: ICreateMessageData, client: IChatSocket): void {
    client.broadcast.to(body.room).emit(ChatEvent.DELETE_MESSAGE, body);
  }
}
