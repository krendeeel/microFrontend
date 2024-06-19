import { FC, ReactNode, useState } from 'react';
import { CounterContext } from './CounterContext';

interface IProps {
  children: ReactNode;
}

export const CounterProvider: FC<IProps> = ({ children }) => {
  const [counter, setCounter] = useState(0);

  return (
    <CounterContext.Provider value={{ counter, setCounter }}>{children}</CounterContext.Provider>
  );
};
