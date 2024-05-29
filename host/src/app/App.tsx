import { lazy, Suspense, useState } from 'react';
import { LazyComponent } from '../shared/lazy/LazyComponent/LazyComponent';
import { IMicroService } from '../shared/types/microServices/IMicroService';
const Chat = lazy(() => import('chat/App'));

const catalogService: IMicroService = {
  scope: 'catalog',
  module: 'Catalog',
  url: 'http://localhost:3002/catalog.js'
};

const App = () => {
  const [isOpenChat, setIsOpenChat] = useState<boolean>(false);
  const [isOpenCatalog, setIsOpenCatalog] = useState<boolean>(false);

  return (
    <div>
      <div>HOST</div>
      <button onClick={() => setIsOpenChat(!isOpenChat)}>toggle chat</button>
      <button onClick={() => setIsOpenCatalog(!isOpenCatalog)}>toggle catalog</button>
      {isOpenChat && (
        <Suspense>
          <Chat />
        </Suspense>
      )}
      {isOpenCatalog && (
        <LazyComponent microService={catalogService} loader={<div>Загрузка...</div>} />
      )}
    </div>
  );
};

export default App;
