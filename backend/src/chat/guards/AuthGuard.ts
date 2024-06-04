import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { IChatSocket } from '../entities/IChatSocket';
import { resolveAuthorization } from '../resolvers/resolveAuthorization';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const client = context.switchToWs().getClient<IChatSocket>();

    resolveAuthorization(client.handshake.auth);

    return true;
  }
}
