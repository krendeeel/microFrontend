import { Counter } from './Counter';

// не перерисовывается при изменении контекста
export const CounterWrapper = () => {
  // отсутвуют перерисовки при изменении состояния контекста
  console.count('context wrapper');
  return (
    <>
      <Counter />
    </>
  );
};
