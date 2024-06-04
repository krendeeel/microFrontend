import { Socket } from 'socket.io';
import { IChatAction } from '../actions/IChatAction';

export type IChatSocket = Socket<IChatAction>;
