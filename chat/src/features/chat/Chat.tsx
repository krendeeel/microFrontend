import { DispatchWithoutAction, FC } from 'react';
import { useChat } from './hooks/useChat';
import { IAuth } from '../../entities/auth/IAuth';

interface IProps {
  auth: IAuth;
  logout: DispatchWithoutAction;
}

export const Chat: FC<IProps> = ({ logout, auth }) => {
  const { messages, onLogout, onSendMessage } = useChat({ auth, logout });

  return (
    <div>
      <h3>Chat</h3>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <form onSubmit={onSendMessage}>
        <input required name={'message'} />
        <button type={'submit'}>Send</button>
      </form>
      <button type={'button'} onClick={onLogout}>
        Disconnect
      </button>
    </div>
  );
};
