import { IAuth } from '../entities/IAuth';
import { WsException } from '@nestjs/websockets';

export const resolveAuthorization = (auth: Record<string, unknown>): IAuth => {
  const { user, room } = auth;
  const authorized =
    user && room && typeof room === 'string' && typeof user === 'string';

  if (!authorized) {
    throw new WsException('Unauthorized');
  }

  return { user, room };
};
