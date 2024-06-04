import { Module } from '@nestjs/common';
import { ChatGateway } from './gateway/ChatGateway';
import { MessageService } from './services/MessageService';
import { ConnectionService } from './services/ConnectionService';

@Module({
  imports: [],
  controllers: [],
  providers: [ChatGateway, MessageService, ConnectionService],
  exports: [],
})
export class ChatModule {}
