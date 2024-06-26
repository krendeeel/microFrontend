import { Module } from '@nestjs/common';
import { ChatModule } from './chat/ChatModule';

@Module({
  imports: [ChatModule],
  providers: [],
  controllers: [],
})
export class AppModule {}
