import { useCounter } from './context/CounterContext';

export const Counter = () => {
  // получение состояния напрямую (без props drilling, поскольку остальные
  // компоненты не зависят от этого состояния)
  const { counter, setCounter } = useCounter();

  console.count('counter');

  return (
    <div>
      <div>Counter: {counter}</div>
      <button onClick={() => setCounter(counter + 1)}>increment</button>
    </div>
  );
};
