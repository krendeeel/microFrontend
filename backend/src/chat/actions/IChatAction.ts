import { ChatEvent } from '../events/ChatEvent';
import { IConnectedData } from '../dto/IConnectedData';
import { ICreateMessageData } from '../dto/ICreateMessageData';

export interface IChatAction {
  [ChatEvent.CONNECTED]: (data: IConnectedData) => void;
  [ChatEvent.DISCONNECTED]: (data: IConnectedData) => void;
  [ChatEvent.CREATE_MESSAGE]: (data: ICreateMessageData) => void;
  [ChatEvent.DELETE_MESSAGE]: (data: ICreateMessageData) => void;
}
