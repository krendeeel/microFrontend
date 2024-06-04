import { DispatchWithoutAction, FormEventHandler, useEffect, useRef, useState } from 'react';
import { IAuth } from '../../../entities/auth/IAuth';
import { ChatService } from '../../../entities/chat/api/ChatService';

interface IParams {
  auth: IAuth;
  logout: DispatchWithoutAction;
}

interface IResult {
  messages: string[];
  onLogout: DispatchWithoutAction;
  onSendMessage: FormEventHandler<HTMLFormElement>;
}

export const useChat = ({ auth, logout }: IParams): IResult => {
  const chatService = useRef<ChatService>();

  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    chatService.current = new ChatService(auth);
    chatService.current.connect((message) =>
      setMessages((previousMessages) => [...previousMessages, message])
    );

    return () => {
      chatService.current?.disconnect();
    };
  }, []);

  const onSendMessage: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const formData = new FormData(form);

    const message = String(formData.get('message'));

    setMessages((previousMessages) => [...previousMessages, message]);

    form.reset();

    chatService?.current?.sendMessage({
      message,
      user: auth.user,
      room: auth.room
    });
  };

  const onLogout = () => {
    chatService.current?.disconnect();
    logout();
  };

  return {
    messages,
    onLogout,
    onSendMessage
  };
};
