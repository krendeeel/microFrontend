import { useState } from 'react';

const App = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      CATALOG
      <div>
        <div>{counter}</div>
        <button onClick={() => setCounter(counter + 1)}>+</button>
      </div>
    </div>
  );
};

export default App;
