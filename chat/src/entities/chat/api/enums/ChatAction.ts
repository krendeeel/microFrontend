import { ChatEvent } from './ChatEvents';

import { ICreateMessageRequest } from '../requests/ICreateMessageRequest';
import { IConnectedRequest } from '../requests/IConnectedRequest';

export interface ChatAction {
  [ChatEvent.CONNECTED]: (request: IConnectedRequest) => void;
  [ChatEvent.DISCONNECTED]: (request: IConnectedRequest) => void;
  [ChatEvent.CREATE_MESSAGE]: (request: ICreateMessageRequest) => void;
  [ChatEvent.DELETE_MESSAGE]: (request: ICreateMessageRequest) => void;
  [ChatEvent.EXCEPTION]: (error: Error) => void;
}
