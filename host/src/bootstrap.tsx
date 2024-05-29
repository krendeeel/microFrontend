import App from './app/App';
import { createRoot } from 'react-dom/client';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root not found!');
}

const container = createRoot(root);
container.render(<App />);
