import { DispatchWithoutAction, FC, memo } from 'react';
import { CounterWrapper } from './CounterWrapper';
import { CounterProvider } from './context/CounterProvider';

interface IProps {
  resetTimer: DispatchWithoutAction;
}

const Bottom: FC<IProps> = memo(({ resetTimer }) => {
  console.count('bottom');

  return (
    // Ограничение доступа к состоянию
    <CounterProvider>
      <div>
        <button onClick={resetTimer}>reset timer</button>
        <hr />
        <CounterWrapper />
      </div>
    </CounterProvider>
  );
});

export default Bottom;
