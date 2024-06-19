import { createContext, Dispatch, useContext } from 'react';

interface ICounterContext {
  counter: number;
  setCounter: Dispatch<number>;
}

export const CounterContext = createContext<ICounterContext>({
  counter: 0,
  setCounter: () => {}
});

export const useCounter = (): ICounterContext => {
  return useContext(CounterContext);
};
