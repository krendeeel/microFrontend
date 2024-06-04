import React, { Dispatch, DispatchWithoutAction, FC, useRef, useState } from 'react';
import { Chat } from '../features/chat/Chat';
import { Auth } from '../features/auth/Auth';
import { IAuth } from '../entities/auth/IAuth';

const App: FC = () => {
  const [auth, setAuth] = useState<IAuth>();

  const { current: logout } = useRef<DispatchWithoutAction>(() => setAuth(undefined));

  const { current: login } = useRef<Dispatch<IAuth>>((data) => setAuth(data));

  return auth ? <Chat auth={auth} logout={logout} /> : <Auth login={login} />;
};

export default App;
