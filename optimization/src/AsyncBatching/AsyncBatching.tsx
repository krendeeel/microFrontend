import { FC, memo, useDebugValue, useState } from 'react';

const AsyncBatching: FC = memo(() => {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);

  useDebugValue({ counter1, counter2 }, (value) => Object.keys(value));

  const increment = () => {
    setTimeout(() => {
      setCounter1((prevState) => prevState + 1);
      setCounter2((prevState) => prevState + 1);
    }, 100);
  };

  console.count('async counter');

  return (
    <div>
      <h3>async batching</h3>
      <div>counter1: {counter1}</div>
      <div>counter2: {counter2}</div>
      <button onClick={increment}>increment</button>
    </div>
  );
});

export default AsyncBatching;
