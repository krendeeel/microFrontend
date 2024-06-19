import { memo, useDeferredValue, useMemo, useState } from 'react';

const Concurrent = memo(() => {
  const [filter, setFilter] = useState<string>(() => '');

  const numbers = useMemo(() => Array.from({ length: 10000 }, (_, index) => index), []);

  const filteredNumbers = filter
    ? numbers.filter((number) => number.toString().includes(filter))
    : numbers;

  // const [isPending, startTransition] = useTransition();
  //
  // const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
  //   startTransition(() => {
  //     setFilter(event.target.value);
  //   });
  // };

  const deferredNumbers = useDeferredValue(filteredNumbers);

  return (
    <div>
      <h3>numbers list</h3>
      <input placeholder={'поиск...'} onChange={(event) => setFilter(event.target.value)} />
      <ul style={{ opacity: deferredNumbers === filteredNumbers ? 1 : 0.3 }}>
        {deferredNumbers.map((number) => (
          <li key={number}>{number}</li>
        ))}
      </ul>
    </div>
  );
});

export default Concurrent;
