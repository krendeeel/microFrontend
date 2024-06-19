import { useState, lazy, Suspense, useRef, useLayoutEffect, useMemo } from 'react';

const Concurrent = lazy(() => import('../Concurrent/Concurrent'));
const Bottom = lazy(() => import('../StoreMiddleware/Bottom'));
const AsyncBatching = lazy(() => import('../AsyncBatching/AsyncBatching'));
const VirtualizedList = lazy(() => import('../Virtualization/VirtualizedList'));
const WithoutReactState = lazy(() => import('../WithoutReactState/WithoutReactState'));

//https://www.webpagetest.org/, вкладка lighthouse
const App = () => {
  const startAtRef = useRef<number>(Date.now());
  const [timer, setTimer] = useState(0);
  const [isOpenList, setIsOpenList] = useState(false);

  console.count('app');

  useLayoutEffect(() => {
    const intervalId = setInterval(() => {
      const passed = Date.now() - startAtRef.current;
      setTimer(passed);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // никуда не передается, нет смысла мемоизировать
  const secondsPassed = Math.ceil(timer / 1000);

  // сохранение ссылки
  const { current: resetTimer } = useRef(() => {
    setTimer(0);
    startAtRef.current = Date.now();
  });

  // сохранение ссылки
  const startedData = useMemo(() => {
    const now = new Date();

    return {
      minutes: now.getMinutes(),
      seconds: now.getSeconds()
    };
  }, []);

  return (
    <div>
      <hr />
      {secondsPassed}
      <hr />
      <Suspense fallback={<div>Загрузка...</div>}>
        <Bottom resetTimer={resetTimer} />
      </Suspense>
      <hr />
      <Suspense fallback={<div>Загрузка...</div>}>
        <AsyncBatching />
      </Suspense>
      <hr />
      <Suspense fallback={<div>Загрузка...</div>}>
        <WithoutReactState startedData={startedData} />
      </Suspense>
      <hr />
      <button onClick={() => setIsOpenList(!isOpenList)}>toggle list</button>
      <hr />
      {isOpenList && (
        <Suspense fallback={<div>Загрузка...</div>}>
          <VirtualizedList />
        </Suspense>
      )}
      <Suspense fallback={<div>Загрузка...</div>}>
        <Concurrent />
      </Suspense>
      <hr />
    </div>
  );
};

export default App;
